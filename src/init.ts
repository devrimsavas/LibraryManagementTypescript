import Book from "./classes/BookClass.js";
import Library from "./classes/LibraryClass.js";
import Client from "./classes/ClientClass.js";
import bookData from "./data/bookdata.js";

function createNewLibrary(name: string): Library {
  const library = new Library(name, [], []);
  return library;
}

function initBooks(bookData: any, library: Library): void {
  for (let bookInfo of bookData) {
    const [title, author, genre, pageNumbers] = bookInfo;

    //new book
    const book = new Book(
      title as string,
      author as string,
      genre as string[],
      pageNumbers as number
    ); //create book
    const amount: number = Math.floor(Math.random() * 50) + 10;

    //add to library
    library.addBookToLibrary(book, amount);
  }
}

function addNewClientToLibrary(client: Client, library: Library): void {
  library.addClient(client);
  console.log(
    `Client "${client.name}" has been successfully created with ID: ${client.clientId}`
  );
}

//create library
const library = createNewLibrary("City Library");

//init books
initBooks(bookData, library);
library.displayLibraryBooks();

//create a client
// 4. Add a new client
const client = new Client(
  Math.floor(Math.random() * 99999999) + 10000000,
  "Alice",
  "alice@example.com",
  "123-456-7890",
  [],
  0
);

//add to library
addNewClientToLibrary(client, library);

//show clients

library.displayClients();
