import {
  GetFormQueryParameters,
  PaginatedFormResponse,
} from "../routes/forms/formModel";
import qs from "qs";

const FILLOUT_API_BASE_URL = "https://api.fillout.com/v1/api";

export const fetchFilloutForm = async (
  id: string,
  queryParameters?: GetFormQueryParameters
): Promise<PaginatedFormResponse | null> => {
  const queryString = queryParameters
    ? `?${qs.stringify(queryParameters)}`
    : "";

  const response = await fetch(
    `${FILLOUT_API_BASE_URL}/forms/${id}/submissions${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.FILLOUT_API_KEY,
      },
    }
  );

  if (!response.ok) {
    return null;
  }
  return response.json();
};
