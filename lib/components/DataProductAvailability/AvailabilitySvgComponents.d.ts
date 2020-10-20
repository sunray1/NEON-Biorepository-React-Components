export function SvgDefs(): JSX.Element;
export const CELL_ATTRS: {
    available: {
        stroke: null;
        strokeWidth: null;
        width: string;
        height: string;
        rx: string;
        nudge: number;
        fill: string;
    };
    'not available': {
        stroke: null;
        strokeWidth: null;
        width: string;
        height: string;
        rx: string;
        nudge: number;
        fill: string;
    };
    'not collected': {
        stroke: null;
        strokeWidth: null;
        width: string;
        height: string;
        rx: string;
        nudge: number;
        fill: string;
    };
    expected: {
        strokeWidth: string;
        width: string;
        height: string;
        rx: string;
        nudge: number;
        fill: string;
        stroke: string;
    };
    tentative: {
        strokeWidth: string;
        width: string;
        height: string;
        rx: string;
        nudge: number;
        fill: string;
        stroke: string;
    };
    'not expected': {
        strokeWidth: string;
        width: string;
        height: string;
        rx: string;
        nudge: number;
        fill: string;
        stroke: string;
    };
    'being processed': {
        strokeWidth: string;
        width: string;
        height: string;
        rx: string;
        nudge: number;
        fill: string;
        stroke: string;
    };
    delayed: {
        strokeWidth: string;
        width: string;
        height: string;
        rx: string;
        nudge: number;
        fill: string;
        stroke: string;
    };
    'mixed some availability': {
        strokeWidth: string;
        width: string;
        height: string;
        rx: string;
        nudge: number;
        fill: string;
        stroke: string;
    };
    'mixed no availability': {
        strokeWidth: string;
        width: string;
        height: string;
        rx: string;
        nudge: number;
        fill: string;
        stroke: string;
    };
};
export function JsxCell(props: any): JSX.Element;
export namespace JsxCell {
    export namespace propTypes {
        export const status: PropTypes.Validator<string>;
        export const x: PropTypes.Requireable<number>;
        export const y: PropTypes.Requireable<number>;
    }
    export namespace defaultProps {
        const x_1: number;
        export { x_1 as x };
        const y_1: number;
        export { y_1 as y };
    }
}
import PropTypes from "prop-types";