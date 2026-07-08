const bookedDatesData =
    document.getElementById("bookedDatesData");

if (bookedDatesData) {

    const bookedDates =
        JSON.parse(bookedDatesData.value);

    flatpickr("#checkIn", {
        dateFormat: "Y-m-d",
        disable: bookedDates,
        minDate: "today",
        onChange: calculatePrice
    });

    flatpickr("#checkOut", {
        dateFormat: "Y-m-d",
        disable: bookedDates,
        minDate: "today",
        onChange: calculatePrice
    });
}

function calculatePrice() {

    const checkIn =
        document.getElementById("checkIn").value;

    const checkOut =
        document.getElementById("checkOut").value;

    const listingPrice =
        Number(
            document.getElementById("listingPrice").value
        );

    if (checkIn && checkOut) {

        const start =
            new Date(checkIn);

        const end =
            new Date(checkOut);

        const nights =
            Math.ceil(
                (end - start) /
                (1000 * 60 * 60 * 24)
            );

        if (nights > 0) {

            const total =
                nights * listingPrice;

            document.getElementById("nights")
                .textContent = nights;

            document.getElementById("totalPrice")
                .textContent = total.toLocaleString();

            document.getElementById("hiddenTotalPrice")
                .value = total;

        }
    }
}