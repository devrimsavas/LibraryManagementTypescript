//library class

import Book from "./BookClass";
import Client from "./ClientClass";

interface bookInterface {
  book: Book;
  amount: number;
}

interface libraryBookInterface {
  book: Book;
  amount: number;
}

class Library {
  constructor(
    public name: string,
    public books: bookInterface[],
    public clients: Client[]
  ) {}

  public addBookToLibrary(book: Book, amount: number) {
    //check if this book existed
    //if existed add amount
    const existingBook: bookInterface | undefined = this.books.find(
      (entry: bookInterface) => entry.book.title === book.title
    );
    if (existingBook) {
      existingBook.amount += amount;
      console.log(
        `${amount} more copies of "${book.title}" added. Total: ${existingBook.amount}`
      );
    } else {
      this.books.push({ book: book, amount: amount });
    }
    console.log(`${amount} copies of "${book.title}" added to the library.`);
  }

  //register a client
  public addClient(client: Client) {
    const existingClient: Client | undefined = this.clients.find(
      (c: Client) => c.clientId === client.clientId
    );
    if (!existingClient) {
      this.clients.push(client);
      console.log(`Client ${client.name} has been registered`);
    } else {
      console.log(`Client "${client.name}" is already registered.`);
    }
  }

  //Borrow a book from library
  public borrowBook(bookTitle: string, clientId: number, borrowedDate: Date) {
    const client: Client | undefined = this.clients.find(
      (c: Client) => client?.clientId === clientId
    );

    const libraryBook: libraryBookInterface | undefined = this.books.find(
      (entry: any) => entry.book.title === bookTitle
    );

    if (!client) {
      console.log(`Client with ID ${clientId} is not registered.`);
      return;
    }

    if (!libraryBook || libraryBook.amount <= 0) {
      console.log(`"${bookTitle}" is not available in the library.`);
      return;
    }
    //client borrow book
    client.borrowBook(libraryBook.book, borrowedDate);
    libraryBook.amount--; //decrease number of book
    console.log(`${client.name} borrowed "${bookTitle}".`);
  }

  //return book
  public returnBook(
    bookTitle: string,
    clientId: number,
    actualReturnDate: Date
  ) {
    const client: Client | undefined = this.clients.find(
      (c: Client) => c.clientId === clientId
    );
    if (!client) {
      console.log(`Client with ID ${clientId} is not registered.`);
      return;
    }

    const libraryBook: libraryBookInterface | undefined = this.books.find(
      (entry: any) => entry.book.title === bookTitle
    );

    if (!libraryBook) {
      console.log(`"${bookTitle}" is not a valid book in this library.`);
      return;
    }

    client.returnBook(bookTitle, actualReturnDate);
    libraryBook.amount++; //increase number
  }

  //display all books in the library with quantities
  public displayLibraryBooks() {
    console.log(`Books available in the ${this.name} Library:`);
    this.books.forEach((entry: any, index: number) => {
      console.log(
        `"${index + 1}- ${entry.book.title}" by ${entry.book.author} - ${
          entry.book.pageNumbers
        }- ${entry.amount} copies available.`
      );
    });
  }

  //display clients
  public displayClients() {
    console.log("Registered Clients");
    this.clients.forEach((client: Client) => {
      console.log(
        `Client ID: ${client.clientId}\nName: ${client.name}\nEmail:${client.email}\nPhone:${client.telephone}\n\BorrowedBooks: ${client.borrowedBooks}\nPenalty: ${client.penalty}`
      );
    });
  }
}

export default Library;
