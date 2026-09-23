import React from "react";
import "./style.css";
import Button from "../../components/Button";
import Table from "../../components/Table";
import SVGIcon from "../../components/SVGIcon";
import AddStockCard from "../../components/AddStockCard";
import { useStock } from "../../hooks/useStock";
import DeleteCard from "../../components/DeleteCard";
export default function Stock() {
    const { stock, handleSetFilter, handleGetStock, handleDeleteStock } =
        useStock();
    const [showAddCard, setShowAddCard] = React.useState<boolean>(false);
    const handleCloseCard = () => {
        setShowAddCard(false);
        setToEdit(null);
    };
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        if (value !== "" && value !== 0) {
            handleSetFilter(name, value);
        } else {
            handleSetFilter(name, undefined);
        }
    };
    React.useEffect(() => {
        handleGetStock();
    }, [stock.filterBy]);
    const tableDataStructure = {
        header: {
            dataHead: [
                { value: "Product" },
                { value: "Supplier" },
                { value: "Price" },
                { value: "Quantity" },
                { value: "Expiration Date" },
                { value: "Note" },
            ],
            style: {},
            onClickRow: () => {},
        },
        data: [
            ...stock.list?.paginatedStocks?.map((row: any) => {
                const dateTime = new Date(row.expiredDate);
                const day = dateTime.getDate().toString().padStart(2, "0");
                const month = (dateTime.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                const year = dateTime.getFullYear();
                const date = `${day}/${month}/${year}`;
                return {
                    dataRow: [
                        {
                            value: (
                                <div>
                                    {row.product?.productName || row.productID}
                                </div>
                            ),
                        },
                        {
                            value: <div>{row.provider}</div>,
                        },
                        {
                            value: <div>{row.price}</div>,
                        },
                        {
                            value: <div>{row.quantity}</div>,
                        },
                        {
                            value: row.expiredDate ? (
                                <div>{date}</div>
                            ) : (
                                <div style={{ opacity: "0.25" }}>
                                    no expiration
                                </div>
                            ),
                        },
                        {
                            value: row.note ? (
                                <div>{row.note}</div>
                            ) : (
                                <div style={{ opacity: "0.25" }}>
                                    no note
                                </div>
                            ),
                        },
                    ],
                    id: row.stockID,
                    style: {},
                    onClickRow: () => {},
                };
            }),
        ],
    };
    const [toEdit, setToEdit] = React.useState<any>(null);

    const onUpdateStock = (id: string) => {
        setToEdit(
            stock.list.paginatedStocks.find((item: any) => item.stockID === id)
        );
        setShowAddCard(true);
    };

    const onDeleteStock = (id: string) => {
        setOpenDeleteCard({ display: true, id });
    };
    const [openDeleteCard, setOpenDeleteCard] = React.useState({
        display: false,
        id: "",
    });
    const handleOnDeleteStock = async () => {
        const ok = await handleDeleteStock(openDeleteCard.id);
        if (ok) {
            setOpenDeleteCard({
                display: false,
                id: "",
            });
        }
    };
    const tableOptions = [
        {
            label: "Edit",
            icon: (
                <SVGIcon
                    type='edit'
                    color='var(--color-1)'
                    width={20}
                    height={20}
                />
            ),
            onClick: onUpdateStock,
        },
        {
            label: "Delete",
            icon: (
                <SVGIcon
                    type='trash'
                    color='var(--color-1)'
                    width={20}
                    height={20}
                />
            ),
            onClick: onDeleteStock,
        },
    ];
    return (
        <div className='stock-list-page'>
            <div className='page-title'>Stock Management</div>
            <AddStockCard
                display={showAddCard}
                onClose={handleCloseCard}
                toEdit={toEdit}
            />
            <DeleteCard
                display={openDeleteCard.display}
                onClose={() => setOpenDeleteCard({ display: false, id: "" })}
                onDelete={handleOnDeleteStock}
                name='this stock'
            />
            <div className='stock-list main-box'>
                <form className='filters'>
                    <div>
                        <label htmlFor=''>Search</label>
                        <label></label>
                        <div className='search'>
                            <SVGIcon
                                type={"search"}
                                color='var(--color-1)'
                                width={25}
                                height={25}
                            />
                            <input
                                type='text'
                                placeholder='Search...'
                                name='search'
                                onChange={handleOnChange}
                                value={stock.filterBy.search}
                            />
                        </div>
                    </div>
                    <div className='expiredBefore'>
                        <label htmlFor='expiredBefore'>Expired before</label>
                        <input
                            id='expiredBefore'
                            type='date'
                            name='expiredBefore'
                            onChange={handleOnChange}
                            value={stock.filterBy.expiredBefore}
                        />
                    </div>
                    <div className='price'>
                        <label htmlFor='minPrice'>Min Price (TND)</label>
                        <input
                            id='minPrice'
                            type='number'
                            min={0}
                            name='minPrice'
                            onChange={handleOnChange}
                            value={stock.filterBy.minPrice}
                        />
                    </div>
                    <div className='price'>
                        <label htmlFor='maxPrice'>Max Price (TND)</label>
                        <input
                            id='maxPrice'
                            type='number'
                            min={0}
                            name='maxPrice'
                            onChange={handleOnChange}
                            value={stock.filterBy.maxPrice}
                        />
                    </div>
                    <div className='quantity'>
                        <label htmlFor='quantity'>Quantity (items)</label>
                        <input
                            id='quantity'
                            type='number'
                            min={0}
                            name='quantity'
                            onChange={handleOnChange}
                            value={stock.filterBy.quantity}
                        />
                    </div>
                    <Button
                        text='Add Stock'
                        iconName='add'
                        iconWidth={20}
                        iconHeight={20}
                        iconColor='white'
                        onClick={(e: any) => {
                            e.preventDefault();
                            setShowAddCard(true);
                        }}
                        style={{
                            marginBottom: 8,
                            marginLeft: "auto",
                            alignSelf: "end",
                        }}
                    />
                </form>
                <div className='list'>
                    <Table
                        // pagination={stock.pagination}
                        pagination={false}
                        tableDataStructure={tableDataStructure}
                        tableOptions={tableOptions}
                        noDataMessage='No stock items found'
                        loading={stock.loading}
                    />
                </div>
            </div>
        </div>
    );
}
