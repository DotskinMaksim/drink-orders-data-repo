window.onload = function () {
    var searchField = new URLSearchParams(window.location.search).get('searchField');
    var searchValue = new URLSearchParams(window.location.search).get('searchValue');

    if (searchField) {
        document.getElementById("searchField").value = decodeURIComponent(searchField).trim();
    }

    if (searchValue) {
        document.getElementById("searchValue").value = decodeURIComponent(searchValue).trim();
    }
};



function sendSearchRequest() {
    var searchField = document.getElementById("searchField").value;
    var searchValue = document.getElementById("searchValue").value;

    searchField = decodeURIComponent(searchField).trim();
    searchValue = decodeURIComponent(searchValue).trim();

    searchValue = searchValue.replace(/\s+/g, ' ');

    var queryString = "?searchField=" + encodeURIComponent(searchField) + "&searchValue=" + encodeURIComponent(searchValue);

    var newUrl = window.location.pathname + queryString;

    window.location.href = newUrl;

}


function sendAllDataRequest() {


    var url = window.location.pathname;

    window.location.href = url;
}


function sortTable(columnIndex) {
    var table = document.getElementById("drinkTable");
    var rows = Array.from(table.rows).slice(1);
    var isAscending = table.rows[0].cells[columnIndex].classList.contains('asc');

    rows.sort(function (a, b) {
        var cellA = a.cells[columnIndex].innerText;
        var cellB = b.cells[columnIndex].innerText;

        if (columnIndex === 2 || columnIndex === 7 || columnIndex === 8) {
            cellA = parseFloat(cellA);
            cellB = parseFloat(cellB);
        }

        if (cellA < cellB) {
            return isAscending ? -1 : 1;
        } else if (cellA > cellB) {
            return isAscending ? 1 : -1;
        } else {
            return 0;
        }
    });

    rows.forEach(function (row) {
        table.appendChild(row);
    });

    table.rows[0].cells[columnIndex].classList.toggle('asc', !isAscending);
    table.rows[0].cells[columnIndex].classList.toggle('desc', isAscending);
}



function toggleColumnSelection() {
    const checkbox = document.getElementById("toggleColumnCheckbox");
    const columnSelection = document.getElementById("columnSelection");

    if (checkbox.checked) {
        columnSelection.style.display = "block";
    } else {
        columnSelection.style.display = "none";
    }
}

function applyColumnSelection() {
    const checkboxes = document.querySelectorAll(".column-checkbox");

    checkboxes.forEach(checkbox => {
        const columnIndex = checkbox.getAttribute("data-column");
        const columnCells = document.querySelectorAll(`#drinkTable td:nth-child(${parseInt(columnIndex) + 1}), #drinkTable th:nth-child(${parseInt(columnIndex) + 1})`);

        columnCells.forEach(cell => {
            if (checkbox.checked) {
                cell.classList.remove("hidden");

            } else {
                cell.classList.add("hidden");
            }
        });
    });

    closeModal();
}
