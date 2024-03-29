import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  SearchWrapper,
  IngredientsWrapper,
  InputWrapper,
  ListWrapper,
} from "./styles"
import Input from "@material-ui/core/Input"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import * as actions from "../../actions"
import { ingredientList, recipeNames } from "./data"

class Search extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.fetchRecipe = this.fetchRecipe.bind(this)
    this.state = {
      term: "",
      ingredients: ["flour", "sugar", "salt", "milk"],
      inputValue: "",
      recipe: "",
    }
  }
  fetchSearch() {
    const { term, ingredients } = this.state
    // Use the searchRecipes action to fetch recipes
    this.props.searchRecipes(term, ingredients)
  }
  handleSearch(event) {
    const term = event.target.value
    this.setState({ term })
  }
  handleTermChange = (event, newValue) => {
    this.setState({ term: newValue })
  }
  handleInputValueChange = (event, newValue) => {
    this.setState({ inputValue: newValue })
  }
  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ ingredients })
  }
  fetchRecipe(event, id) {
    // Use the fetchRecipe action to fetch the recipe
    this.props.fetchRecipe(id)
  }

  render() {
    const { term, ingredients, inputValue } = this.state
    const { recipes, isLoading } = this.props
    const { recipe, isLoadingRecipe } = this.props
    return (
      <SearchWrapper>
        <div>
          <h2>Ingredients in Pantry</h2>
          <IngredientsWrapper>
            {ingredientList.map((ingredient) => (
              <FormControlLabel
                key={ingredient}
                control={
                  <Checkbox
                    checked={ingredients.includes(ingredient)}
                    onChange={this.handleIngredient.bind(this, ingredient)}
                    value={ingredient}
                  />
                }
                label={ingredient}
              />
            ))}
          </IngredientsWrapper>
        </div>
        <InputWrapper>
          <Autocomplete
            value={term}
            onChange={this.handleTermChange}
            inputValue={inputValue}
            onInputChange={this.handleInputValueChange}
            options={recipeNames}
            getOptionLabel={(option) => option}
            getOptionSelected={(option, value) => option === value}
            renderInput={(params) => (
              <TextField {...params} label="Recipe Names" variant="outlined" />
            )}
          />
        </InputWrapper>
        <Button onClick={this.fetchSearch}>search</Button>
        <Divider />
        {recipes && (
          <ListWrapper>
            <List>
              {recipes.map((recipe) => (
                <ListItem
                  key={recipe.id}
                  button
                  onClick={(event) => this.fetchRecipe(event, recipe.id)}
                >
                  <ListItemText primary={recipe.name} />
                </ListItem>
              ))}
            </List>
          </ListWrapper>
        )}
        {isLoading && <LinearProgress />}
      </SearchWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search, recipe } = state
  return { ...search, ...recipe }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      fetchRecipe: actions.fetchRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Search)
