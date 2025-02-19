import { useForm } from "react-hook-form"
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import './index.css'

type Inputs = {
  cep: string
  rua: string
  bairro: string
  cidade: string
  estado: string
  ibge: string
}

function App() {
  <GlobalStyle />

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>()

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

    if (response.erro && response.length !== 8) {
      alert("CEP não encontrado")
      return
    }

    setValue("rua", response.logradouro.trim())
    setValue("bairro", response.bairro.trim())
    setValue("cidade", response.localidade.trim())
    setValue("estado", response.uf.trim())
    setValue("ibge", response.ibge.trim())

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
            required: "O CEP é obrigatório", minLength: { value: 8, message: "O CEP deve ter 8 dígitos" }, maxLength: { value: 8, message: "O CEP deve ter 8 dígitos" }
          })}
        />

        {errors.cep && <p className="error-message">{errors.cep.message}</p>}

        {errors.cep && errors.cep.type === "minLength" && <p className="error-message"></p>}

        <Button type="submit">Buscar</Button>

        <Label htmlFor="rua">Rua:</Label>
        <Input
          type="text"
          id="rua"
          disabled
          {
          ...register("rua")
          }
        />

        <Label htmlFor="bairro">Bairro:</Label>
        <Input
          type="text"
          id="bairro"
          disabled
          {
          ...register("bairro")
          }
        />

        <Label htmlFor="cidade">Cidade:</Label>
        <Input
          type="text"
          id="cidade"
          disabled
          {
          ...register("cidade")
          }
        />

        <Label htmlFor="estado">Estado:</Label>
        <Input
          type="text"
          id="estado"
          disabled
          {
          ...register("estado")
          }
        />

        <Label htmlFor="ibge">IBGE:</Label>
        <Input
          type="text"
          id="ibge"
          disabled
          {
          ...register("ibge")
          }
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
