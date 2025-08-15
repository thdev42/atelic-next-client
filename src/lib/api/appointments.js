import { API_BASE_URL } from "@/config/config";
import axios from "axios";

export default async function postAppointmentLead(appointmentFormData) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/leads`,
      appointmentFormData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error posting appointment lead:", error);
    throw error;
  }
}
