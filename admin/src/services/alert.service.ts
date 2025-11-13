import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "@/assets/styles/_sweetAlert.css";

const MySwal = withReactContent(Swal);

class AlertService {
  confirmModal(title: string, text: string) {
    return MySwal.fire({
      title: title,
      text: text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: false,
      customClass: {
        container: "sweetalert-container",
        popup: "sweetalert-popup",
        // icon: 'sweetalert-icon',
        title: "sweetalert-title",
        htmlContainer: "sweetalert-text",
        confirmButton: "sweetalert-buttons",
        cancelButton: "sweetalert-buttons-danger",
      },
    });
  }

  confirmWithInputModal(text: string, title?: string) {
    return MySwal.fire({
      title: title || "Confirm",
      input: "textarea",
      text: text,
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: false,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Reason is required',
          );
        }

        return value;
      },
      customClass: {
        container: "sweetalert-container",
        popup: "sweetalert-popup",
        title: "sweetalert-title",
        htmlContainer: "sweetalert-text",
        confirmButton: "sweetalert-buttons",
        cancelButton: "sweetalert-buttons-danger",
      },
    });
  }

  confirmWithInputInitValueModal(text: string) {
    return MySwal.fire({
      title: "Confirm",
      input: "textarea",
      text: text,
      inputValue: "ໂອນເງິນບໍ່ສຳເລັດ",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      allowOutsideClick: false,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Reason is required',
          );
        }

        return value;
      },
      customClass: {
        container: "sweetalert-container",
        popup: "sweetalert-popup",
        title: "sweetalert-title",
        htmlContainer: "sweetalert-text",
        confirmButton: "sweetalert-buttons",
        cancelButton: "sweetalert-buttons-danger",
      },
    });
  }

  async success(title: string, text?: string) {
    await MySwal.fire({
      icon: "success",
      title: title ?? "Success",
      text: text,
      allowOutsideClick: false,
      customClass: {
        container: "sweetalert-container",
        popup: "sweetalert-popup",
        title: "sweetalert-title",
        htmlContainer: "sweetalert-text",
        confirmButton: "sweetalert-buttons",
        closeButton: "sweetalert-buttons",
        icon: "sweetalert-icon",
      },
    });
  }

  async warning(text: string, title?: string) {
    await MySwal.fire({
      icon: "warning",
      title: title ?? "Oops...",
      text: text,
      allowOutsideClick: false,
      customClass: {
        container: "sweetalert-container",
        popup: "sweetalert-popup",
        title: "sweetalert-title",
        htmlContainer: "sweetalert-text",
        confirmButton: "sweetalert-buttons",
      },
    });
  }

  async error(text: string, title?: string) {
    await MySwal.fire({
      icon: "error",
      title: title ?? "Oops...",
      text: text,
      allowOutsideClick: false,
      customClass: {
        container: "sweetalert-container",
        popup: "sweetalert-popup",
        title: "sweetalert-title",
        htmlContainer: "sweetalert-text",
        confirmButton: "sweetalert-buttons",
      },
    });
  }
}

export const alertService = new AlertService();
