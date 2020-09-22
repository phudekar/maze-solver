export const SectionTypes = {
    RIGHT_WALL: 'right',
    LEFT_WALL: 'left',
    TOP_WALL: 'top',
    BOTTOM_WALL: 'bottom',
    SPACE: 'space',
    TOP_LEFT: 'top left',
    TOP_RIGHT: 'top right',
    BOTTOM_LEFT: 'bottom left',
    BOTTOM_RIGHT: 'bottom right',
}

export const Walls = {
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    BOTTOM: 'bottom'
}

const defaultWalls = { left: true, right: true, bottom: true, top: true };

export class Section {
    _walls = {};
    _row = 0;
    _column = 0;
    _visited = false;
    constructor(row, column, walls) {
        this._row = row;
        this._column = column;
        this._walls = { ...defaultWalls, ...walls }
    }

    get row() {
        return this._row;
    }

    get column() {
        return this._column;
    }

    get walls() {
        return { ...this._walls };
    }

    get visited() {
        return this._visited;
    }

    markVisited() {
        this._visited = true;
    }

    isClosed(){
       return !Object.keys(this._walls).find(k => !this._walls[k]);
    }

    breakWall(wall) {
        this._walls[wall] = false;
    }

    breakWallWith(neighbor) {
        if (neighbor.row < this.row) {
            this.breakWall(Walls.TOP);
            neighbor.breakWall(Walls.BOTTOM);
        } else if (neighbor.row > this.row) {
            this.breakWall(Walls.BOTTOM);
            neighbor.breakWall(Walls.TOP);
        } else if (neighbor.column < this.column) {
            this.breakWall(Walls.LEFT);
            neighbor.breakWall(Walls.RIGHT);
        } else if (neighbor.column > this.column) {
            this.breakWall(Walls.RIGHT);
            neighbor.breakWall(Walls.LEFT);
        }
    }

}
