from flask import Flask, render_template, request, jsonify
import quiz_data 

app = Flask(__name__)

@app.route('/')
def quiz():
    return render_template('index.html')

@app.route('/api/questions', methods=['GET'])
def get_questions():
    return jsonify(quiz_data.questions)

@app.route('/api/questions', methods = ['GET'])
def submit_quiz():
    user_answer = request.json['answers']
    correct_answers = [q['correct'] for q in quiz_data.questions]
    score = sum([1 for i in range(len(correct_answers)) if correct_answers[i] == user_answer[i]])

    return (jsonify({'score':score,'max_score':len(correct_answers)}))



if __name__ == '__main__':
    app.run(debug=True)