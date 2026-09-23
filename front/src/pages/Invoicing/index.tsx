/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select from "react-select";
import "./style.css";
// import Button from "../../components/Button";
import Table from "../../components/Table";
import SVGIcon from "../../components/SVGIcon";
import CartSVG from "./cart.svg?react";
// import CardSVG from "./card.svg?react";
// import AddInvoicingCard from "../../components/AddInvoicingCard";
import { useInvoicing } from "../../hooks/useInvoicing";
import { usePagination } from "../../hooks/usePagination";
import { Link, useParams } from "react-router-dom";
import { ROUTER } from "../../constants/env";
import AddPaymentCard from "../../components/AddPaymentCard";
import { InvoiceDetailsCard } from "../../components/InvoiceCard";

export default function Invoicing() {
    // const [isIncome, setIsIncome] = React.useState<boolean>(true);
    // const [showAddCard, setShowAddCard] = React.useState<boolean>(false);
    const {
        getAllInvoices,
        invoicing,
        setFilter,
        selectInvoice,
        getInvoiceByID,
        createNewPayment,
    } = useInvoicing();
    const { pagination, setCurrentPageNumber, setItemsPerPage, itemsPerPage } =
        usePagination();
    const { idInvoice } = useParams();
    React.useEffect(() => {
        console.log("idInvoice", idInvoice);
        if (idInvoice) {
            handleMoreDetailsOnInvoiceByID(idInvoice);
        }
        setCurrentPageNumber(1);
        if (!(itemsPerPage && itemsPerPage > 0)) {
            setItemsPerPage(10);
        }
    }, []);

    React.useEffect(() => {
        if (
            pagination.currentPageNumber ||
            pagination.itemsPerPage ||
            invoicing?.filtersBy.createdAt ||
            invoicing?.filtersBy.patientID ||
            invoicing?.filtersBy.search ||
            invoicing?.filtersBy.status.length > 0
        ) {
            getAllInvoices();
        }
    }, [
        invoicing?.filtersBy,
        pagination.currentPageNumber,
        pagination.itemsPerPage,
    ]);

    // const handleOpenCard = () => {
    //     setShowAddCard(true);
    // };
    // const handleCloseCard = () => {
    //     setShowAddCard(false);
    // };
    // const toggleInvoicingView = () => {
    //     setIsIncome((prev) => !prev);
    // };

    const handleOnChange = (e: any) => {
        const searchText = e.target.value;
        setFilter({ search: searchText });
    };
    const statusOptions = [
        { value: "payed-status", label: "Paid", color: "#53BC57" },
        { value: "part-payed", label: "Partially Paid", color: "#F1B519" },
        { value: "impayed", label: "Unpaid", color: "#EC5252" },
    ];
    const StatusButton = (
        status: "payed-status" | "impayed" | "part-payed",
    ) => {
        let colorStyle = "#EC5252";
        let text = "Unpaid";
        switch (status) {
            case "payed-status":
                colorStyle = "#53BC57";
                text = "Paid";
                break;
            case "part-payed":
                colorStyle = "#F1B519";
                text = "Partially Paid";
                break;
            default:
        }
        return (
            <div
                style={{
                    display: "inline",
                    padding: "5px 15px",
                    borderRadius: 4,
                    backgroundColor: colorStyle,
                    color: "white",
                    fontWeight: 700,
                    minWidth: 100,
                    textAlign: "center",
                    fontSize: 14,
                }}
            >
                {text}
            </div>
        );
    };
    // const statusOptions = [
    //     {
    //         value: "payed",
    //         label: StatusButton("payed"),
    //     },
    //     {
    //         value: "impayed",
    //         label: StatusButton("impayed"),
    //     },
    //     {
    //         value: "part-payed",
    //         label: StatusButton("part-payed"),
    //     },
    // ];
    const tableContent = () => {
        const dataRows = invoicing.list.map((oneRow: any) => {
            const generalInvoiceInfo = [
                {
                    value: (
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: "small",
                            }}
                        >
                            {oneRow.ref}
                        </div>
                    ),
                },
                {
                    value: (
                        <Link to={ROUTER.PATIENT_PROFILE(oneRow.idP)}>
                            {oneRow.firstNameP} {oneRow.lastNameP}
                        </Link>
                    ),
                },
                { value: oneRow.creationDate },
                { value: oneRow.totalAmount },
                { value: oneRow.payedAmount },
                { value: oneRow.restAmount },
                { value: StatusButton(oneRow.status) },
            ];
            return {
                dataRow: generalInvoiceInfo,
                id: oneRow.id,
                style: {},
                onClickRow: () => {
                    handleMoreDetailsOnInvoiceByID(oneRow.id);
                },
                isExtraDataOpen: false,
                extraData: null,
            };
        });
        return {
            header: {
                dataHead: [
                    { value: "Ref." },
                    { value: "Patient" },
                    { value: "Invoice Date" },
                    { value: "Total Amount" },
                    { value: "Paid Amount" },
                    { value: "Remaining Amount" },
                    { value: "Status" },
                ],
                style: {},
                onClickRow: () => { },
            },
            data: dataRows,
        };
    };
    const handleStatus = (data: any) => {
        const filter = data.map((status: any) => status.value);
        setFilter({ status: filter });
    };
    const handleDateFacture = (data: any) => {
        const dateFacturation = data.target.value;
        setFilter({ createdAt: dateFacturation });
    };

    const [isAddPaymentCardOpen, setIsAddPaymentCardOpen] =
        React.useState(false);
    const handleAddNewPayment = (invoiceID: string) => {
        selectInvoice(invoiceID);
        setIsAddPaymentCardOpen(true);
    };
    const handleOnCloseAddPaymentCard = () => {
        setIsAddPaymentCardOpen(false);
    };
    const handleSubmitAddNewPayment = async (paymentAmount: any) => {
        await createNewPayment(paymentAmount);
        await getAllInvoices();
    };

    const [isInvoicePopupDisplayed, setIshowInvoicePopupDisplayed] =
        React.useState(false);
    const handleMoreDetailsOnInvoiceByID = async (invoiceID: string) => {
        try {
            await getInvoiceByID(invoiceID);
            await setIshowInvoicePopupDisplayed(true);
        } catch (e: any) {
            console.log("error from server");
        }
    };
    const handleOnCloseInvoicePopup = () => {
        setIshowInvoicePopupDisplayed(false);
    };

    return (
        <div className="invoicing-page">
            <div className="page-title">Invoicing & Billing</div>
            <div className="invoicing-list main-box">
                <form className="filters">
                    <div>
                        <label htmlFor="search">Search </label>
                        <div className="search">
                            <SVGIcon
                                type={"search"}
                                color="var(--color-1)"
                                width={25}
                                height={25}
                            />
                            <input
                                style={{
                                    height: "38px",
                                }}
                                type="text"
                                placeholder="Search"
                                name="search"
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="status">
                        <label htmlFor="">Status </label>
                        <Select
                            styles={{
                                control: (styles: any) => ({
                                    ...styles,
                                    minWidth: "140px",
                                    width: "fit-content",
                                    height: "40px",
                                    border: "1px solid var(--color-2)",
                                }),
                                placeholder: (base: any) => ({
                                    ...base,
                                    fontSize: "16px",
                                }),
                                option: (
                                    styles: any,
                                    { data, isSelected }: any,
                                ) => {
                                    return {
                                        ...styles,
                                        color: isSelected
                                            ? "white"
                                            : data.color,
                                        backgroundColor: isSelected
                                            ? data.color
                                            : "",
                                        fontWeight: "400",
                                        ":hover": {
                                            backgroundColor: data.color,
                                            color: "white",
                                            cursor: "pointer",
                                        },
                                    };
                                },
                                multiValue: (styles: any, { data }: any) => {
                                    return {
                                        ...styles,
                                        backgroundColor: data.color,
                                        fontWeight: "500",
                                    };
                                },
                                multiValueLabel: (styles: any) => {
                                    return { ...styles, color: "white" };
                                },
                                multiValueRemove: (styles: any) => {
                                    return {
                                        ...styles,
                                        color: "white",
                                        ":hover": {},
                                    };
                                },
                                indicatorSeparator: () => ({
                                    display: "none",
                                }),
                                valueContainer: (provided) => ({
                                    ...provided,
                                }),
                                input: (provided) => ({
                                    ...provided,
                                    height: "35px",
                                }),

                                indicatorsContainer: (provided) => ({
                                    ...provided,
                                    height: "35px",
                                }),
                            }}
                            options={statusOptions}
                            onChange={handleStatus}
                            isMulti
                        />
                    </div>
                    <div className="date">
                        <label htmlFor="">Date </label>
                        <input type="date" onChange={handleDateFacture} />
                    </div>
                </form>
                <InvoiceDetailsCard
                    display={isInvoicePopupDisplayed}
                    handleClose={handleOnCloseInvoicePopup}
                    data={invoicing.invoice}
                />
                <div className="list">
                    <Table
                        tableDataStructure={tableContent()}
                        tableOptions={[
                            {
                                label: "Add Payment",
                                icon: <CartSVG width={20} height={20} />,
                                link: null,
                                onClick: handleAddNewPayment,
                            },
                        ]}
                        loading={invoicing.loading}
                        noDataMessage="No invoices found"
                    />
                    <AddPaymentCard
                        display={isAddPaymentCardOpen}
                        onClose={handleOnCloseAddPaymentCard}
                        onCancel={handleOnCloseAddPaymentCard}
                        onSubmit={handleSubmitAddNewPayment}
                    />
                </div>
            </div>
        </div>
    );
}
