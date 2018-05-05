import React from 'react'
import {connect} from 'react-redux'
import {fetchComments, submitComment} from '../state/comments/actionCreators'
import './CommentsView.css'

const mapStateToProps = (state) => ({
  comments: state.commentsData.comments,
  places: state.placesData.places
})

const mapDispatchToProps = (dispatch) => ({
  fetchDataComments: () => dispatch(fetchComments()),
  submitDataComment: (comment) => dispatch(submitComment(comment),
//console.log('comment w mapDispatch', comment)
  )
})

class CommentsView extends React.Component {
  constructor() {
    super()

    this.state = {
      title: '',
      content: '',
      authorName: ''
    }

    this.handleSubmit = () => {
      this.props.submitDataComment({
        ...this.state,
        itemId: this.props.params.placeId
      })
      this.setState({
        title: '',
        content: '',
        authorName: ''
      })
    }
  }

  componentWillMount() {
    this.props.fetchDataComments()
  }

  render() {
    return (
      <div>
        <div>
          {this.props.comments.filter(comment =>
              // I put "-1" because "this.props.places" is an array, and its items start with number O, but "places.json" is an object and its ids starts with 1
            comment.itemId === this.props.places[parseInt(this.props.params.placeId) - 1].id
          ).map(comment =>
            <div className="comments-displaying">
              <table key={comment.id}>
                <th>
                  <td><h4><b>{comment.title}</b></h4></td>
                </th>
                <tr>
                  <td className="comments-table-content">{comment.content}</td>
                </tr>
                <tr>
                  <td><b>Autor:</b> {comment.authorName}</td>
                </tr>
              </table>
            </div>
          )
          }
        </div>
        <h3 className="comments-add-header">Dodaj opinię</h3>
        <p> Tytuł </p>
        <form className="comments-inputs"
              onSubmit={(event) => {
                event.preventDefault()
                this.handleSubmit()
                this.props.fetchDataComments()
              }}>
          <input type="text"
                 value={this.state.title}
                 onChange={(event) => this.setState({title: event.target.value})}
          />
          <p>Treść komentarza</p>
          <textarea cols="60" rows="7"
                    value={this.state.content}
                    onChange={(event) => this.setState({content: event.target.value})}>
</textarea>
          <p>Podpis</p>
          <input type="text"
                 value={this.state.authorName}
                 onChange={(event) => this.setState({authorName: event.target.value})}/>
          <br/>
          <button type="submit">Dodaj opinię</button>
        </form>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentsView)
