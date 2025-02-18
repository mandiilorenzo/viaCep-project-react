import { useForm } from "react-hook-form"
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import './index.css'

type Inputs = {
  cep: string
}

function App() {
  <GlobalStyle />

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const getCep = async (cep: string) => {
    try {
      if (!cep) throw new Error("CEP inválido!")

      const url = `https://viacep.com.br/ws/${cep}/json/`
      const response = await fetch(url)

      if (!response.ok) throw new Error("Erro ao buscar CEP")

      return await response.json()
    } catch (error) {
      console.log('ERRO:', error)
    }
  }

  const handleSubmitForm = async (data: { cep: string }) => {
    const response = await getCep(data.cep)
    console.log("Dados recebidos:", response)

    if (response.erro) {
      alert("CEP não encontrado")
      return
    }

    document.getElementById("rua")!.setAttribute("value", response.logradouro)
    document.getElementById("bairro")!.setAttribute("value", response.bairro)
    document.getElementById("cidade")!.setAttribute("value", response.localidade)
    document.getElementById("estado")!.setAttribute("value", response.uf)
    document.getElementById("ibge")!.setAttribute("value", response.ibge)
  }


  return (
    <Main>

      <h1>Informe o CEP</h1>

      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <h2>Informe o Cep e obtenha informações:</h2>

        <Label htmlFor="cep">Cep:</Label>
        <Input
          type="text"
          id="cep"
          placeholder="Digite o cep"
          {...register("cep", {
            required: "O CEP é obrigatório", minLength: { value: 8, message: "O CEP deve ter 8 dígitos!" }
          })}
        />

        {errors.cep && <p className="error-message">{errors.cep.message}</p>}

        {errors.cep && errors.cep.type === "minLength" && <p className="error-message"></p>}

        <Button type="submit">Buscar</Button>

        <Label htmlFor="rua">Rua:</Label>
        <Input
          type="text"
          name="rua"
          id="rua"
          disabled
        />

        <Label htmlFor="bairro">Bairro:</Label>
        <Input
          type="text"
          name="bairro"
          id="bairro"
          disabled
        />

        <Label htmlFor="cidade">Cidade:</Label>
        <Input
          type="text"
          name="cidade"
          id="cidade"
          disabled
        />

        <Label htmlFor="estado">Estado:</Label>
        <Input
          type="text"
          name="estado"
          id="estado"
          disabled
        />

        <Label htmlFor="ibge">IBGE:</Label>
        <Input
          type="text"
          name="ibge"
          id="ibge"
          disabled
        />
      </Form>
    </Main>
  )
}

const GlobalStyle = createGlobalStyle`
margin: 0;
padding: 0;
box-sizing: border-box;
`

const Main = styled.main`
    background-color: green;
    width: 100%;
    display: flex;
    flex-direction: column;

    h1 {
    margin-top: 20px;
    border-bottom: 2px solid yellow;
    color: #ffffff;
    text-align: center;
    padding-block: 10px;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    gap: 6px;
    max-width: 100%;

    h2 {
    color: #ffffff;
    font-size: 15px;
    font-weight: 300;
    }
`
const Input = styled.input`
    width: 230px;
    height: 20px;
`

const Button = styled.button`
    width: 55px;
    height: 25px;
    cursor: pointer;
`

const Label = styled.label`
    max-width: 200px;
    color: #ffffff;
    align-self: self-start;
`

export default App
