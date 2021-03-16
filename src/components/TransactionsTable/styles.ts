import styled from "styled-components";

export const Container = styled.main`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      background: var(--shape);
      padding: 1rem 2rem;
      border: 0;
      color: var(--text-body);

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }

      &:first-child {
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;

        color: var(--text-title);
      }

      &:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }
      
    }
  }
`