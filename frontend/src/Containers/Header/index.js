import React from "react"
import LinearProgress from "@material-ui/core/LinearProgress"
import { HeaderWrapper } from "./styles"

class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <h1>The Joy of Recipes</h1>
      </HeaderWrapper>
    )
  }
}

export default Header