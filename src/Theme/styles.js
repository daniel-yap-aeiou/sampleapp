import styled from "styled-components";

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.body};
`;

export const P = styled.p`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

export const P1 = styled.p`
  color: black;
`;

export const A = styled.a`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.a};
`;

export const DIV = styled.div`
color: ${({ theme }) => theme.text};
background-color: ${({ theme }) => theme.body};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.text};
`;

export const Small = styled.small`
  color: ${({ theme }) => theme.text};
`;

export const H3 = styled.h3`
  color: ${({ theme }) => theme.text};
`;

export const H5 = styled.h5`
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
`;

export const H6 = styled.h6`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  line-height: 1.5;
`;

export const TD = styled.td`
  color: ${({ theme }) => theme.text};
`;

export const TH = styled.td`
  color: ${({ theme }) => theme.text};
`;