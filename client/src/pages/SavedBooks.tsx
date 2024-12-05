import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
// import { getMe } from '../utils/API';
// import { deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_SINGLE_USER } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import type { User } from '../models/User';


const SavedBooks = () => {
  const { loading, data } = useQuery(GET_SINGLE_USER);
  const userData: User = data?.getSingleUser || {
    username: '',
    email: '',
    password: '',
    savedBooks: [],
  };

  const [deleteBook] = useMutation(REMOVE_BOOK,{
    refetchQueries:[GET_SINGLE_USER]
  });

  // use this to determine if `useEffect()` hook needs to run again


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteBook({
        variables: { bookId },
      });

      if (!data?.removeBook) {
        removeBookId(bookId);
      }
    } catch (err) {
      console.error('Error deleting book:', err);
      }
    };

    // if data isn't here yet, say so
    if (loading) {
      return <h2>LOADING...</h2>;
    }

    return (
      <>
        <div className='text-light bg-dark p-5'>
          <Container>
            {userData.username ? (
              <h1>Viewing {userData.username}'s saved books!</h1>
            ) : (
              <h1>Viewing saved books!</h1>
            )}
          </Container>
        </div>
        <Container>
          <h2 className='pt-5'>
            {userData.savedBooks.length
              ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
              : 'You have no saved books!'}
          </h2>
          <Row>
            {userData.savedBooks.map((book) => {
              return (
                <Col md='4'>
                  <Card key={book.bookId} border='dark'>
                    {book.image ? (
                      <Card.Img
                        src={book.image}
                        alt={`The cover for ${book.title}`}
                        variant='top'
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className='small'>Authors: {book.authors}</p>
                      <Card.Text>{book.description}</Card.Text>
                      <Button
                        className='btn-block btn-danger'
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
                        Delete this Book!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    );
  };

  export default SavedBooks;
