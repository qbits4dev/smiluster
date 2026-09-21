import React from "react";
import HomeSVG from "../../icons/home.svg?react";
import AppointmentSVG from "../../icons/appointment.svg?react";
import NotificationSVG from "../../icons/notification.svg?react";
import PatientSVG from "../../icons/patient.svg?react";
import StockSVG from "../../icons/stock.svg?react";
import InvoicingSVG from "../../icons/invoicing.svg?react";
import SettingsSVG from "../../icons/settings.svg?react";
import AddSVG from "../../icons/add.svg?react";
import RightArrowSVG from "../../icons/right-arrow.svg?react";
import RightSVG from "../../icons/right.svg?react";
import LeftArrowSVG from "../../icons/left-arrow.svg?react";
import DotsSVG from "../../icons/dots.svg?react";
import CheckSVG from "../../icons/check.svg?react";
import SearchSVG from "../../icons/search.svg?react";
import RemoveSVG from "../../icons/remove.svg?react";
import LogoutSVG from "../../icons/logout.svg?react";
import EditSVG from "../../icons/edit.svg?react";
import TrashSVG from "../../icons/trash.svg?react";
import DownloadSVG from "../../icons/download.svg?react";
import UploadSVG from "../../icons/upload.svg?react";
import Upload2SVG from "../../icons/upload2.svg?react";
import PhoneSVG from "../../icons/phone.svg?react";
import EmailSVG from "../../icons/email.svg?react";
import MaleSVG from "../../icons/male.svg?react";
import FemaleSVG from "../../icons/female.svg?react";
import ViewSVG from "../../icons/view.svg?react";

import DocumentSVG from "../../icons/document.svg?react";
import PrescriptionSVG from "../../icons/prescription.svg?react";
import CameraSVG from "../../icons/camera.svg?react";
import SandClockSVG from "../../icons/sand-clock.svg?react";
import NotFound from "../../icons/not-found.svg?react";
import ShowSVG from "../../icons/show.svg?react";
import HideSVG from "../../icons/hide.svg?react";
import MinimizeSVG from "../../icons/minimize.svg?react";
import MaximizeSVG from "../../icons/maximize.svg?react";
import DotSVG from "../../icons/dot.svg?react";
import HelpSVG from "../../icons/circule-help.svg?react";
import LinkSVG from "../../icons/go-link.svg?react";

export default function SVGIcon(props: SVGProps) {
    const { type, color, width, height, style, onClick } = props;
    const iconStyle = {
        ...style,
        color: color,
        width: width + "px",
        height: height + "px",
    };
    switch (type) {
        case "home":
            return <HomeSVG style={iconStyle} onClick={onClick} />;
        case "appointments":
            return <AppointmentSVG style={iconStyle} onClick={onClick} />;
        case "notification":
            return <NotificationSVG style={iconStyle} onClick={onClick} />;
        case "patients":
            return <PatientSVG style={iconStyle} onClick={onClick} />;
        case "stock":
            return <StockSVG style={iconStyle} onClick={onClick} />;
        case "invoicing":
            return <InvoicingSVG style={iconStyle} onClick={onClick} />;
        case "settings":
            return <SettingsSVG style={iconStyle} onClick={onClick} />;
        case "add":
            return <AddSVG style={iconStyle} onClick={onClick} />;
        case "right":
            return <RightSVG style={iconStyle} onClick={onClick} />;
        case "right-arrow":
            return <RightArrowSVG style={iconStyle} onClick={onClick} />;
        case "left-arrow":
            return <LeftArrowSVG style={iconStyle} onClick={onClick} />;
        case "dots":
            return <DotsSVG style={iconStyle} onClick={onClick} />;
        case "check":
            return <CheckSVG style={iconStyle} onClick={onClick} />;
        case "search":
            return <SearchSVG style={iconStyle} onClick={onClick} />;
        case "remove":
            return <RemoveSVG style={iconStyle} onClick={onClick} />;
        case "logout":
            return <LogoutSVG style={iconStyle} onClick={onClick} />;
        case "edit":
            return <EditSVG style={iconStyle} onClick={onClick} />;
        case "trash":
            return <TrashSVG style={iconStyle} onClick={onClick} />;
        case "download":
            return <DownloadSVG style={iconStyle} onClick={onClick} />;
        case "upload":
            return <UploadSVG style={iconStyle} onClick={onClick} />;
        case "upload2":
            return <Upload2SVG style={iconStyle} onClick={onClick} />;
        case "phone":
            return <PhoneSVG style={iconStyle} onClick={onClick} />;
        case "email":
            return <EmailSVG style={iconStyle} onClick={onClick} />;
        case "male":
            return <MaleSVG style={iconStyle} onClick={onClick} />;
        case "female":
            return <FemaleSVG style={iconStyle} onClick={onClick} />;
        case "view":
            return <ViewSVG style={iconStyle} onClick={onClick} />;
        case "document":
            return <DocumentSVG style={iconStyle} onClick={onClick} />;
        case "prescription":
            return <PrescriptionSVG style={iconStyle} onClick={onClick} />;
        case "camera":
            return <CameraSVG style={iconStyle} onClick={onClick} />;
        case "sand-clock":
            return <SandClockSVG style={iconStyle} onClick={onClick} />;
        case "not-found":
            return <NotFound style={iconStyle} onClick={onClick} />;
        case "show":
            return <ShowSVG style={iconStyle} onClick={onClick} />;
        case "hide":
            return <HideSVG style={iconStyle} onClick={onClick} />;
        case "mini":
            return <MinimizeSVG style={iconStyle} onClick={onClick} />;
        case "maxi":
            return <MaximizeSVG style={iconStyle} onClick={onClick} />;
        case "dot":
            return <DotSVG style={iconStyle} onClick={onClick} />;
        case "help":
            return <HelpSVG style={iconStyle} onClick={onClick} />;
        case "link":
            return <LinkSVG style={iconStyle} onClick={onClick} />;
        default:
            return null;
    }
}
interface SVGProps {
    type: string;
    color: string;
    width: number;
    height: number;
    style?: any;
    onClick?: any;
}

SVGIcon.defaultProps = {
    name: "",
    color: "black",
    width: 32,
    height: 32,
    onClick: () => { },
};
