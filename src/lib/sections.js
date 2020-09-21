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
    constructor(openWall) {
        this.walls = { ...defaultWalls, [openWall]: false }
    }

    get walls() {
        return { ...this.walls };
    }
}
