import { TypeSquare } from "../enums/type-square";

export interface Square {
    type: TypeSquare,
    srcImage: String,
    visible: boolean,
    stench: boolean,
    wind: boolean,
    finishSquare: boolean,
    number: number,
    leftWall: boolean,
    rightWall: boolean,
    topWall: boolean,
    botWall: boolean,
    row: number,
    col: number
}
