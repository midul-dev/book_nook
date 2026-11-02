
const BookDetailPage = async ({params} : {params: {bookId: string}}) => {
    const { bookId } = await params;
    const res = await fetch(`http://localhost:5000/all-books/${bookId}`);
    const book = await res.json();
    console.log("Fetched book detail:", book);
    return (
        <div>
           <h1>{book.title}</h1>
           <p>{book.author}</p>
           <p>{book.description}</p>
        </div>
    );
};

export default BookDetailPage;