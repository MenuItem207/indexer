/**
 * model for header object
 */
class Header {
    constructor(header, starting_line_index, closing_line_index) {
        this.header = header;
        this.starting_line_index = starting_line_index;
        this.closing_line_index = closing_line_index;
    }
}

module.exports = Header;