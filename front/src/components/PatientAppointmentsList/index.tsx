import React from "react";
import Table from "../Table";
import Select from "react-select";
import SVGIcon from "../SVGIcon";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../constants/env";
import "./style.css";
import { useAppointments } from "../../hooks/useAppointments";
import DeleteCard from "../DeleteCard";
import { PulseLoader } from "react-spinners";

//editor
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import Quill styles

export default function PatientAppointmentsList(props: any) {
    const navigate = useNavigate();
    //editor
    // const [value, setValue] = React.useState<string>("");

    // const handleChange = (
    //     content: string,
    //     delta: any,
    //     source: string,
    //     editor: typeof Quill
    // ): void => {
    //     setValue(content);
    // };
    // const modules = {
    //     toolbar: [
    //         [{ header: "1" }, { header: "2" }, { font: [] }],
    //         [{ size: [] }],
    //         ["bold", "italic", "underline", "strike", "blockquote"],
    //         [
    //             { list: "ordered" },
    //             { list: "bullet" },
    //             { indent: "-1" },
    //             { indent: "+1" },
    //         ],
    //         ["link", "image", "video"],
    //         ["clean"],
    //     ],
    //     clipboard: {
    //         matchVisual: false,
    //     },
    // };

    // const formats = [
    //     "header",
    //     "font",
    //     "size",
    //     "bold",
    //     "italic",
    //     "underline",
    //     "strike",
    //     "blockquote",
    //     "list",
    //     "bullet",
    //     "indent",
    //     "link",
    //     "image",
    //     "video",
    // ];
    //editor

    // const { openCard, closeCard, setToEdit, patientID } = props;
    const {
        patientAppointments,
        handleChangeAppointmentsFilters,
        handleDeleteAppointment,
        handleGetPatientAppointments,
        clearPatientAppointments,
    } = useAppointments();
    // React.useEffect(() => {
    //     if (patientAppointments.filterBy.patientID) {
    //         handleGetPatientAppointments();
    //     }
    // }, [patientAppointments.filterBy]);
    // React.useEffect(() => {

    //     return () =>{
    //         clearPatientAppointments();
    //     }
    // }, []);
    // const onUpdateAppointment = (id: string) => {
    //     // setToEdit(
    //     //     appointments.data.find((item: any) => item.appointmentID === id)
    //     // );
    //     // openCard();
    //     // console.log("onUpdateAppointment" + id);
    // };

    const onDeleteAppointment = (id: string) => {
        setOpenDeleteCard({ display: true, id });
    };
    const [openDeleteCard, setOpenDeleteCard] = React.useState({
        display: false,
        id: "",
    });
    const handleOnDeleteAppointment = async () => {
        const ok = await handleDeleteAppointment(openDeleteCard.id);
        if (ok) {
            setOpenDeleteCard({
                display: false,
                id: "",
            });
        }
    };

    const tableOptions = [
        {
            label: "Delete",
            icon: (
                <SVGIcon
                    type="trash"
                    color="var(--color-1)"
                    width={25}
                    height={25}
                />
            ),
            onClick: onDeleteAppointment,
        },
    ];
    const statusOptions = [
        { value: "scheduled", label: "Scheduled", color: "#2C86EF" },
        { value: "pending", label: "Pending", color: "#F18E19" },
        { value: "completed", label: "Completed", color: "#1BD788" },
        { value: "canceled", label: "Canceled", color: "#E20202" },
    ];
    const colorStyles = {
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
        option: (styles: any, { data, isSelected }: any) => {
            return {
                ...styles,
                color: isSelected ? "white" : data.color,
                backgroundColor: isSelected ? data.color : "",
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
            return { ...styles, color: "white", ":hover": {} };
        },
    };
    const tableDataStructure = {
        header: {
            dataHead: [
                { value: "Date" },
                { value: "Status" },
                { value: "Rx" },
                { value: "Total" },
                { value: "Paid" },
                { value: "Note" },
            ],
            style: {},
            onClickRow: () => {},
        },
        data: [
            ...patientAppointments?.data?.map((row: any) => {
                const dateTime = new Date(row.appointmentDateTime);
                const day = dateTime.getDate().toString().padStart(2, "0");
                const month = (dateTime.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                const year = dateTime.getFullYear();
                const date = `${day}/${month}/${year}`;
                const hours = dateTime.getHours().toString().padStart(2, "0");
                const minutes = dateTime
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                const formattedTime = `${hours}:${minutes}`;
                return {
                    dataRow: [
                        {
                            value: (
                                <div>
                                    <div>{date}</div>
                                    <div
                                        style={{
                                            fontSize: "small",
                                            opacity: "0.7",
                                        }}
                                    >
                                        {formattedTime}
                                    </div>
                                </div>
                            ),
                        },
                        {
                            value: (
                                <div
                                    style={{
                                        backgroundColor:
                                            statusOptions?.find(
                                                (item: any) =>
                                                    item.value?.toLowerCase() ===
                                                    row.status?.toLowerCase(),
                                            )?.color || "black",
                                        color: "white",
                                        width: "fit-content",
                                        padding: "3px 6px",
                                        borderRadius: "var(--main-rd)",
                                    }}
                                >
                                    {
                                        statusOptions?.find(
                                            (item: any) =>
                                                item.value?.toLowerCase() ===
                                                row.status?.toLowerCase(),
                                        )?.label
                                    }
                                </div>
                            ),
                        },

                        {
                            value: (
                                <div
                                    style={{
                                        opacity: row.ordonnance ? "1" : "0.2",
                                    }}
                                >
                                    <SVGIcon
                                        type="prescription"
                                        color="black"
                                        height={40}
                                        width={40}
                                    />
                                </div>
                            ),
                        },
                        {
                            value: (
                                <div>
                                    {row.totalCost}{" "}
                                    <span
                                        style={{
                                            opacity: "0.5",
                                        }}
                                    >
                                        DT
                                    </span>
                                </div>
                            ),
                        },
                        {
                            value: (
                                <div style={{}}>
                                    {row.totalPaidAmount}{" "}
                                    <span
                                        style={{
                                            opacity: "0.5",
                                        }}
                                    >
                                        DT
                                    </span>
                                </div>
                            ),
                        },
                        {
                            value: row.note || (
                                <div style={{ opacity: "0.25" }}>
                                    no note
                                </div>
                            ),
                        },
                    ],
                    id: row.appointmentID,
                    style: {},
                    onClickRow: () => {
                        navigate(ROUTER.APPOINTMENT_PAGE(row.appointmentID));
                    },
                };
            }),
        ],
    };

    return (
        <div className="appointment-list">
            <DeleteCard
                display={openDeleteCard.display}
                onClose={() => setOpenDeleteCard({ display: false, id: "" })}
                onDelete={handleOnDeleteAppointment}
                name="this appointment"
            />
            <form className="filters">
                <div>
                    <label htmlFor="">Search</label>

                    <div className="search">
                        <SVGIcon
                            type="search"
                            color="var(--color-1)"
                            width={25}
                            height={25}
                        />
                        <input
                            name="search"
                            type="text"
                            placeholder="Search..."
                            value={patientAppointments.filterBy.search}
                            onChange={(e) =>
                                handleChangeAppointmentsFilters([
                                    {
                                        name: e.target.name,
                                        value: e.target.value,
                                    },
                                ])
                            }
                        />
                    </div>
                </div>
                <div className="date">
                    <label htmlFor="startDay">From</label>
                    <input
                        type="date"
                        name="startDay"
                        id="startDay"
                        value={patientAppointments.filterBy.startDay}
                        onChange={(e) =>
                            handleChangeAppointmentsFilters([
                                {
                                    name: e.target.name,
                                    value: e.target.value,
                                },
                            ])
                        }
                    />
                </div>
                <div className="date">
                    <label htmlFor="endDay">To</label>
                    <input
                        type="date"
                        name="endDay"
                        id="endDay"
                        value={patientAppointments.filterBy.endDay}
                        onChange={(e) =>
                            handleChangeAppointmentsFilters([
                                {
                                    name: e.target.name,
                                    value: e.target.value,
                                },
                            ])
                        }
                    />
                </div>
                <div
                    className="status"
                    style={{
                        zIndex: "19",
                    }}
                >
                    <label htmlFor="">Status</label>
                    <Select
                        options={statusOptions}
                        styles={colorStyles}
                        isMulti
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: "var(--color-1)",
                            },
                        })}
                        isSearchable={false}
                        placeholder="Select..."
                        noOptionsMessage={() => "No options"}
                        onChange={(item) =>
                            handleChangeAppointmentsFilters([
                                {
                                    name: "status",
                                    value: item?.map((status) => status.value),
                                },
                            ])
                        }
                    />
                </div>
            </form>
            <div className="list">
                {patientAppointments.loading ? (
                    <div
                        className="center"
                        style={{
                            backgroundColor: "var(--color-3)",
                            height: "100%",
                            borderRadius: "var(--main-rd)",
                        }}
                    >
                        <PulseLoader
                            color={"var(--color-1)"}
                            loading={patientAppointments.loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    <Table
                        pagination={false}
                        tableDataStructure={tableDataStructure}
                        tableOptions={tableOptions}
                        noDataMessage="No appointments found"
                    />
                )}
            </div>
        </div>
    );
}
