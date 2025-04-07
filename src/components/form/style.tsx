import styled from 'styled-components'

export const Main = styled.main`
    background-color: background: linear-gradient(to right, #56ab2f, #a8e063);
    width: 100%;
    display: flex;
    flex-direction: column;

    h1 {
        margin-top: 20px;
        color: #ffffff;
        text-align: center;
        padding-block: 10px;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 40px;}
            }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid yellow;
    background-color:#ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    padding: 20px;
    margin: auto;
    gap: 6px;
    width: 100%;
    max-width: 400px;

    h2 {
        color: #56ab2f;
        font-size: 16px;
        font-weight: 500;
        }

    input:focus {
        border-color: #56ab2f;
        border-shadow: 0 0 5px rgba(86, 171, 47, 0.5);
        }

    @media (max-width: 768px) {
    h2 {
        font-size: 20px;
        }
    }

    @media (max-width: 380px) {
    margin: auto;
    width: 85%;
    margin-bottom: 30px;
    }
`
export const Input = styled.input`
    width: 100%;
    padding: 6px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 8px;
    outline: none;
    transition: border-color 0.3s ease;

    @media (max-width: 768px) {
    font-size: 18px;
    }
}
`

export const Button = styled.button`
    width: 80px;
    cursor: pointer;
    background-color: #56ab2f;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

    button:hover {
        background-color: #3d8a24;
        }
`

export const Label = styled.label`
    max-width: 200px;
    color: #56ab2f;
    align-self: self-start;
    font-weight: 500;

    @media (max-width: 768px) {
    font-size: 20px;
    }
`