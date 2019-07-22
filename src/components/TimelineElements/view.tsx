import React from 'react';
import styled, { StyledComponent } from '@emotion/styled';

import { MovementType } from '../Timeline/constants';
import { ReactiveColumnWrapperProps } from './declarations';

// TOOD: Pass number of columns
// TODO: Pass colours
// TODO: Pass highlight colour
// TODO: Make grid layout, template an inline thing
// TODO: Theme provider

/**
 * Grid row
 */
export const Row: StyledComponent<any, any, any> = styled.div`
  &.header {
    background-color: #932727;
    color: white;
    border-bottom: 1px solid black;
    li {
      background: none;
    }
  }
`;

/**
 * Grid Columns container
 */
export const Columns: StyledComponent<any, any, any> = styled.ul``;

/**
 * Grid Column
 */
export const Column: StyledComponent<any, any, any> = styled.li`
  padding: 20px;
  background: #dadada;
  position: relative;
  .item {
    border-radius: 5px;
    color: #fff;
    min-width: 100%;
    position: absolute;
    left: 0;
    z-index: 10;
    top: 5%;
    height: 90%;
    cursor: move;
    cursor: grab;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    &:active {
      background: #ffc877;
      opacity: 0.8;
      cursor: move;
      cursor: grabbing;
      pointer-events: none;
      user-select: none;
      .handle,
      .inner {
        pointer-events: none;
      }
    }
    .handle {
      height: 80%;
      position: absolute;
      top: 10%;
      left: 5px;
      background: #fff;
      z-index: 20;
      width: 5px;
      border-radius: 10xp;
      &.handle-left {
        cursor: col-resize;
        cursor: w-resize;
        left: 5px;
      }
      &.handle-right {
        left: auto;
        right: 3px;
        cursor: col-resize;
        cursor: e-resize;
      }
    }
    .inner {
      vertical-align: center;
      text-align: center;
      z-index: 5;
      pointer-events: none;
      user-select: none;
    }
  }
`;

/**
 * First Table Column
 */
export const FirstColumn: StyledComponent<any, any, any> = styled.div`
  padding: 20px;
`;

/**
 * Grid wrapper setting the main grid
 */
export const Wrapper: StyledComponent<any, any, any> = styled.div`
  display: grid;
  border: 0;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  background-color: white;
  > div {
    display: grid;
    grid-template-columns: ${({ withFirstColumn, withFirstColumnSize }) =>
        withFirstColumn ? withFirstColumnSize || '1fr' : ''} 1fr;
    > ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(
        ${({ numberOfColumns }) => numberOfColumns},
        1fr
      );
      grid-gap: 8px 0;
      padding: 0;
      margin: 0;
    }
  }
`;

/**
 * Reactive Column Wrapper displays the column and it's size.
 * It's a function, that gets feeded the multi-casting Behaviour
 * Subject from rxjs, filters the result to only care about
 * it's own change and renders the component.
 */
export const ReactiveColumnWrapper = React.memo(
  ({ i, columnSizing }: ReactiveColumnWrapperProps) => {
    /**
     * Calculate latest column size
     */
    const [columnSize, columnSpan] = columnSizing;

    /**
     * Render the column
     */
    return (
      <Columns key={`line-${i}`}>
        <Column
          style={{
            gridColumn: `${columnSize} / span ${columnSpan}`,
          }}
        >
          <div
            className="item"
            data-index={i}
            data-type={MovementType.Drag}
            data-edge={MovementType.None}
            data-sizing={`${columnSize},${columnSpan}`}
          >
            <div
              data-edge={MovementType.Left}
              data-type={MovementType.Resize}
              className="handle handle-left"
            />
            <div className="inner">Here</div>
            <div
              data-edge={MovementType.Right}
              data-type={MovementType.Resize}
              className="handle handle-right"
            />
          </div>
        </Column>
      </Columns>
    );
  }
);
