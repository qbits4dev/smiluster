import * as React from "react";
import "./style.css";
import PrescriptionSVG from "../../icons/prescription.svg?react";
import DocumentSVG from "../../icons/document.svg?react";
import UploadSVG from "../../icons/upload.svg?react";
import WriteSVG from "../../icons/write.svg?react";
import SVGIcon from "../../components/SVGIcon";
import DeleteCard from "../../components/DeleteCard";
import { useDocuments } from "../../hooks/useDocuments";
import { useAppointments } from "../../hooks/useAppointments";
import { usePatients } from "../../hooks/usePatients";

export default function FileModel({
    content,
    type,
    onClick,
    data,
    handleEditFile,
    // handleDeleteFile,
    handleDownloadFile,
}: // handleViewFile,
    FileModelProps) {
    const renderIcon = () => {
        switch (type) {
            case "prescription":
                return <PrescriptionSVG />;
            case "document":
                return <DocumentSVG />;
            default:
                return null;
        }
    };

    const renderFirstBoxScript = () => {
        switch (type) {
            case "prescription":
                return (
                    <div className='empty-content center'>
                        <div className='empty-title center'>Ecrire</div>
                        <div className='empty-description center'>
                            Ecrire une nouvelle ordonnance
                        </div>
                    </div>
                );
            case "document":
                return (
                    <div className='empty-content center'>
                        <div className='empty-title center'>Importer</div>
                        <div className='empty-description center'>
                            Importer un nouveau document
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    const [openDelete, setOpenDelete] = React.useState(false);
    const { handleDeleteDocument, handleGetDocuments } = useDocuments();
    const { appointment } = useAppointments();
    const { patient } = usePatients();

    const handleDeleteFile = async (docID: any) => {
        setOpenDelete(false);
        let ok = await handleDeleteDocument(docID);
        if (ok) {
            await handleGetDocuments(
                appointment?.patientID || patient.data?.patientID
            );
        }
    };

    return (
        <div
            className={`file center ${content}`}
            style={{
                cursor: content === "empty" ? "pointer" : "",
            }}
            onClick={onClick}
        >
            {content === "filled" && type && (
                <>
                    <div className='icon center'>{renderIcon()}</div>
                    <div className={`${type}-actions box`}>
                        <div className='file-title'>{data?.fileName}</div>
                        <div className='file-actions'>
                            <div
                                className='icon'
                                onClick={() => handleDownloadFile(data)}
                            >
                                <SVGIcon type='view' color='var(--color-1)' />
                            </div>
                            {/* <div
                                className='icon'
                                onClick={() => handleViewFile(data)}
                            >
                                <SVGIcon type='view' color='var(--color-1)' />
                            </div> */}
                            <div
                                className='icon'
                                onClick={() => setOpenDelete(true)}
                            >
                                <SVGIcon type='trash' color='var(--color-1)' />
                            </div>
                            <div
                                className='icon'
                                onClick={() =>
                                    handleEditFile && handleEditFile(data)
                                }
                            >
                                <SVGIcon type='edit' color='var(--color-1)' />
                            </div>
                        </div>
                    </div>
                </>
            )}
            {content === "empty" && type && (
                <>
                    <div className='icon center'>
                        {type === "prescription" ? (
                            <WriteSVG color='var(--color-1)' />
                        ) : (
                            <UploadSVG color='var(--color-1)' />
                        )}
                    </div>
                    {renderFirstBoxScript()}
                </>
            )}
            <DeleteCard
                display={openDelete}
                onClose={() => setOpenDelete(false)}
                name='Document'
                onDelete={() => handleDeleteFile(data?.docID)}
            />
        </div>
    );
}

interface FileModelProps {
    content: "filled" | "empty";
    type: string;
    onClick?: any;
    data?: any;
    handleEditFile?: any;
    handleDeleteFile?: any;
    handleDownloadFile?: any;
    handleViewFile?: any;
}
// FileModel.defaultProps = {
//     content: "filled",
//     type: "document",
//     onClick: () => {},
//     data: [],
//     handleEditFile: () => {},
//     handleDeleteFile: () => {},
//     handleDownloadFile: () => {},
// };
