module.exports = function solveSudoku(matrix) {
    const emptyCells = getEmptyCells(matrix);

    let row = 0; // current row
    let col = 0; // current col
    let value = 0; // current value

    let found = false; // track value's validity

    // iterate empty cells
    let i = 0;
    while (i < emptyCells.length) {
        // update current coordinates
        row = emptyCells[i][0];
        col = emptyCells[i][1];

        value = matrix[row][col] + 1; // increment value of a cell
        found = false; // value is not valid until checked

        // trying every possible value
        while (!found && value <= 9) {
            if (checkValue(matrix, row, col, value)) {
                // valid value found
                found = true;
                matrix[row][col] = value;
                i++; // move to the next empty cell
            } else {
                value++; // try next value
            }
        }

        if (!found) {
            // no valid values for this cell, move back and update value for the previous cell
            matrix[row][col] = 0;
            i--;
        }
    }

    return matrix;
};

function getEmptyCells(board) {
    const emptyCells = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
                emptyCells.push([i, j]);
            }
        }
    }

    return emptyCells;
}

function checkRow(board, row, value) {
    for (let i = 0; i < board[row].length; i++) {
        if (board[row][i] === value) {
            return false;
        }
    }

    return true;
}

function checkColumn(board, column, value) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][column] === value) {
            return false;
        }
    }

    return true;
}

function checkArea(board, row, column, value) {
    const AREA_SIZE = 3;

    const areaStartRow = Math.floor(row / AREA_SIZE) * AREA_SIZE;
    const areaStartCol = Math.floor(column / AREA_SIZE) * AREA_SIZE;

    for (let i = areaStartRow; i < areaStartRow + AREA_SIZE; i++) {
        for (let j = areaStartCol; j < areaStartCol + AREA_SIZE; j++) {
            if (board[i][j] === value) {
                return false;
            }
        }
    }

    return true;
}

function checkValue(board, row, column, value) {
    return checkRow(board, row, value) && checkColumn(board, column, value) && checkArea(board, row, column, value);
}