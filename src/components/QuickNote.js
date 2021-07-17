import React, { useState, useEffect } from 'react'
/** @jsxImportSource @emotion/react */
import { useForm } from 'react-hook-form';
import { jsx, css } from '@emotion/react'
import { useCookies } from 'react-cookie';

function QuickNote({ textColor }) {
  const style = css`
    position: relative;
    display: inline-block;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 0px 40px 5px rgba(0,0,0,0.15);
    width: 300px;
    padding: 25px;
    color: ${textColor};
    margin: 30px;
    transition: all 0.5s ease-in-out;
    &:hover {
      width: 350px;
      background-color: #404040;
      color: #fff;
      cursor: pointer;
      & textarea {
        background-color: #fff;
      }
    }
  `
  const cityInput = css`
    border: none;
    font-size: 15px;
    padding: 10px;
    outline: none;
    border-radius: 12px;
    transition: all 0.5s ease-in-out;
    background-color: #ddd;
    &:focus::placeholder {
      color: transparent;
    }
    &::placeholder {
      transition: color 0.3s ease-in-out;
    }
`
  const [textNote, setTextNote] = useState("Your note goes here!")
  const {register, handleSubmit} = useForm()

  const onSubmit = data => {
    setTextNote(data?.textNote)
    setCookie('quickNote', data?.textNote, {path: '/'})
  }

  const [cookies, setCookie] = useCookies(["quickNote"])


  useEffect(() => {
    if (cookies["quickNote"] != undefined) {
      setTextNote(cookies["quickNote"])
    }
  })


  return (
    <div css={style}>
        <h1>Quick Note</h1>
        <h2>{textNote}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea rows="4" cols="20" css={cityInput} {...register("textNote")} id="textNote" placeholder="Enter Note Here!"></textarea>
          <br />
          <button type='submit'>Submit</button>
        </form>
    </div>
  );
}

export default QuickNote;
