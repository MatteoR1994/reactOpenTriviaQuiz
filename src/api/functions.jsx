import { api } from "./api.jsx";

export const retrieveCategories = () => {
    return api.get("/api_category.php");
}

export const generateQuestions = (props) => {
    return api.get(props);
}