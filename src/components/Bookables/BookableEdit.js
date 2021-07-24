import {useNavigate, useParams} from "react-router";

import BookableForm from "./BookableForm";
import {Error, Loading} from "../Commons";
import {useBookable, useDeleteBookable, useUpdateBookable} from "../../apis/Bookables";

const BookableEdit = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    const {bookable} = useBookable(id, {suspense: true});
    const {
        updateBookable,
        error: updateError,
        isError: isUpdateError,
        isLoading: isUpdateLoading
    } = useUpdateBookable(bookable => navigate(`/bookables/${bookable.id}`));
    const {
        deleteBookable,
        error: deleteError,
        isError: isDeleteError,
        isLoading: isDeleteLoading
    } = useDeleteBookable(() => navigate("/bookables"));

    if (isUpdateLoading) return <Loading message="Updating bookable..."/>;
    if (isUpdateError) return <Error error={updateError}/>;

    if (isDeleteLoading) return <Loading message="Deleting bookable..."/>;
    if (isDeleteError) return <Error error={deleteError}/>;

    return (
        <BookableForm bookable={bookable}
                      onSave={updateBookable}
                      onDelete={deleteBookable}
                      onCancel={() => navigate(`/bookables/${id}`)}/>
    );
}

export default BookableEdit;