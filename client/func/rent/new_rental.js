// Standard Method
////////////////////
Template.book_detail.events({
    'click .rent': function () {
        let bookId = Iron.Location.get().path.substring(5,22);
        let user = this.__originalId;
        let role = this.role;
        let date = moment().format('MMMM Do YYYY');
        let book_name = books.findOne({ _id: bookId }).title;
        let momentDate = moment().format("YYYYMMD");


        if (role === "Student") {
            let length = 30;
        }
        if (role === "Teacher") {
            let length = 180;
        }

        rentals.insert({
            bookId: bookId,
            length: length,
            renter: user,
            book_name: book_name,
            date: date,
            momentDate: momentDate
        });

        clients.update(user, {
            $inc: { booksOut: 1 }
        });

        books.update(bookId, {
            $inc: { stock: -1 }
        })
    }
});
