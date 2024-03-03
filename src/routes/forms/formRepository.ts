import { fetchFilloutForm } from "../../utils/filloutRestApiHelper";
import { GetFormQueryParameters, PaginatedFormResponse } from "./formModel";

export const formRepository = {
  findById: async (
    id: string,
    queryParameters?: GetFormQueryParameters
  ): Promise<PaginatedFormResponse | null> => {
    const form = await fetchFilloutForm(id, queryParameters);

    if (queryParameters?.filters && form) {
      const filters: {
        id: string;
        condition: string;
        value: string | number;
      }[] = JSON.parse(queryParameters.filters as unknown as string);

      const newFormResponses = form?.responses.filter((response) => {
        return filters?.every((filter) => {
          const question = response.questions.find((q) => q.id === filter.id);
          if (question === undefined) {
            return false;
          }

          let questionValue: string | number = question.value;
          let filterValue = filter.value;
          if (question.type.toLowerCase().includes("date")) {
            questionValue = new Date(question.value).getTime();
            filterValue = new Date(filter.value).getTime();
          } else if (question.type.toLowerCase().includes("number")) {
            questionValue = Number(question.value);
            filterValue = Number(filter.value);
          }
          switch (filter.condition) {
            case "equals":
              return questionValue === filterValue;
            case "does_not_equal":
              return questionValue !== filterValue;
            case "greater_than":
              return questionValue > filterValue;
            case "less_than":
              return questionValue < filterValue;
          }
        });
      });

      form.responses = newFormResponses;
      form.totalResponses = newFormResponses.length;
    }

    return form;
  },
};
