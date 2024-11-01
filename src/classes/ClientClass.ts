//client class

import Book from "./BookClass";

// Interface for borrowed book
interface interfaceBorrowedBooks {
  book: Book;
  borrowedDate: Date;
  returnDate: Date;
  returned: boolean; // Track if the book has been returned
}

class Client {
  constructor(
    public clientId: number,
    public name: string,
    public email: string,
    public telephone: string,
    public borrowedBooks: interfaceBorrowedBooks[] = [], // Array of borrowed books
    public penalty: number = 0
  ) {}

  public borrowBook(book: Book, borrowedDate: Date) {
    const borrowed: Date = new Date(borrowedDate);
    const returnDate: Date = new Date(borrowed);
    returnDate.setDate(borrowed.getDate() + 21); // Set return date to 21 days later

    this.borrowedBooks.push({
      book: book,
      borrowedDate: borrowed,
      returnDate: returnDate,
      returned: false, // Mark the book as not returned
    });

    console.log(
      `${this.name} borrowed "${
        book.title
      }" on ${borrowed.toLocaleDateString()} and needs to return it before: ${returnDate.toLocaleDateString()}`
    );
  }

  public returnBook(bookTitle: string, actualReturnDate: Date) {
    const returnDate: Date = new Date(actualReturnDate);
    const borrowedEntry = this.borrowedBooks.find(
      (entry: interfaceBorrowedBooks) =>
        entry.book.title === bookTitle && !entry.returned
    );

    if (borrowedEntry) {
      // Mark the book as returned
      borrowedEntry.returned = true;
      const dueDate: Date = borrowedEntry.returnDate;

      if (returnDate > dueDate) {
        const lateDays: number = Math.ceil(
          (returnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
        ); // Calculate late days

        const penalty = lateDays * 5; // 5 krona per day of delay
        this.penalty += penalty;

        console.log(
          `${
            this.name
          } returned "${bookTitle}" on ${returnDate.toLocaleDateString()} (late by ${lateDays} days). Penalty: ${penalty} krona. Total penalty: ${
            this.penalty
          } krona.`
        );
      } else {
        console.log(
          `${
            this.name
          } returned "${bookTitle}" on time on ${returnDate.toLocaleDateString()}.`
        );
      }
    } else {
      console.log(
        `${this.name} has not borrowed "${bookTitle}" or has already returned it.`
      );
    }
  }

  public displayBorrowedBooks() {
    console.log(`${this.name}'s Borrowed Books Lists`);

    //no book borrowed
    if (this.borrowedBooks.length === 0) {
      console.log("No book borrowed yet");
    } else {
      this.borrowedBooks.forEach(
        (entry: interfaceBorrowedBooks, index: number) => {
          const returnInfo = entry.returned
            ? `Returned`
            : `Due: ${entry.returnDate.toLocaleDateString()}`;
          console.log(
            `${index + 1}. ${
              entry.book.title
            } (Borrowed on: ${entry.borrowedDate.toLocaleDateString()}) - ${returnInfo}`
          );
        }
      );
    }

    console.log(`Total penalty: ${this.penalty} krona`);
  }
}

export default Client;
