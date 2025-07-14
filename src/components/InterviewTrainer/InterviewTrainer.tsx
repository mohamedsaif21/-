import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, Pause, RotateCcw, MessageCircle, BarChart3, Award, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { apiService } from '../../services/api';

interface InterviewTrainerProps {
  darkMode: boolean;
}

const InterviewTrainer: React.FC<InterviewTrainerProps> = ({ darkMode }) => {
  const { addInterviewSession } = useStore();
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const interviewTypes = [
    { id: 'behavioral', name: 'Behavioral Interview', description: 'STAR method questions about past experiences' },
    { id: 'technical', name: 'Technical Interview', description: 'Role-specific technical questions' },
    { id: 'situational', name: 'Situational Interview', description: 'Hypothetical scenario-based questions' },
    { id: 'case-study', name: 'Case Study', description: 'Problem-solving and analytical thinking' }
  ];

  const difficultyLevels = [
    { id: 'entry', name: 'Entry Level', description: '0-2 years experience' },
    { id: 'mid', name: 'Mid Level', description: '3-5 years experience' },
    { id: 'senior', name: 'Senior Level', description: '5+ years experience' },
    { id: 'executive', name: 'Executive', description: 'Leadership positions' }
  ];

  const [selectedType, setSelectedType] = useState('behavioral');
  const [selectedDifficulty, setSelectedDifficulty] = useState('mid');
  const [jobTitle, setJobTitle] = useState('Software Engineer');

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  const startInterviewSession = async () => {
    try {
      const response = await apiService.startInterviewSession(jobTitle, selectedDifficulty);
      setSessionId(response.sessionId);
      setQuestions(response.questions);
      setCurrentQuestion(response.questions[0]?.question || '');
      setSessionStarted(true);
      setTimer(0);
      setIsTimerRunning(true);
    } catch (error) {
      console.error('Failed to start interview session:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // Process audio for speech-to-text
        processAudioAnswer(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const processAudioAnswer = async (audioBlob: Blob) => {
    // In a real implementation, this would convert speech to text
    // For now, we'll use the text answer
    await submitAnswer();
  };

  const submitAnswer = async () => {
    if (!sessionId || !userAnswer.trim()) return;

    setIsAnalyzing(true);
    try {
      await apiService.submitInterviewAnswer(sessionId, currentQuestion, userAnswer);
      
      // Move to next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentQuestion(questions[currentQuestionIndex + 1].question);
        setUserAnswer('');
      } else {
        // Interview completed
        await finishInterview();
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const finishInterview = async () => {
    if (!sessionId) return;

    setIsTimerRunning(false);
    try {
      const feedbackData = await apiService.getInterviewFeedback(sessionId);
      setFeedback(feedbackData);
      
      // Save to store
      addInterviewSession({
        id: sessionId,
        jobTitle,
        duration: timer,
        score: feedbackData.overallScore,
        feedback: feedbackData.suggestions,
        completedAt: new Date()
      });
    } catch (error) {
      console.error('Failed to get feedback:', error);
    }
  };

  const resetSession = () => {
    setSessionStarted(false);
    setSessionId(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setCurrentQuestion('');
    setUserAnswer('');
    setFeedback(null);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (feedback) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Interview Complete!
              </h2>
              <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Duration: {formatTime(timer)} • Questions: {questions.length}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className={`p-6 rounded-xl text-center ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                <div className="text-3xl font-bold text-blue-500 mb-2">{feedback.overallScore}%</div>
                <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Overall Score</div>
              </div>
              <div className={`p-6 rounded-xl text-center ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                <div className="text-3xl font-bold text-green-500 mb-2">{feedback.communicationScore}%</div>
                <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Communication</div>
              </div>
              <div className={`p-6 rounded-xl text-center ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                <div className="text-3xl font-bold text-purple-500 mb-2">{feedback.contentScore}%</div>
                <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Content Quality</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Key Strengths
                </h3>
                <div className="space-y-2">
                  {feedback.strengths?.map((strength: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Areas for Improvement
                </h3>
                <div className="space-y-2">
                  {feedback.improvements?.map((improvement: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={resetSession}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Start New Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sessionStarted) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              AI Interview Trainer
            </h1>
            <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Practice with our AI interviewer and get real-time feedback
            </p>
          </div>

          <div className={`p-8 rounded-xl shadow-lg mb-8 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Interview Setup
            </h2>

            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300'
                  }`}
                  placeholder="e.g., Software Engineer, Product Manager"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Interview Type
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {interviewTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedType === type.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : darkMode
                            ? 'border-slate-600 hover:border-slate-500'
                            : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {type.name}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {type.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Experience Level
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedDifficulty(level.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedDifficulty === level.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : darkMode
                            ? 'border-slate-600 hover:border-slate-500'
                            : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {level.name}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {level.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={startInterviewSession}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Interview in Progress
            </h1>
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              <span className={`font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {formatTime(timer)}
              </span>
            </div>
            
            <button
              onClick={resetSession}
              className={`px-4 py-2 rounded-lg ${
                darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              End Interview
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`w-full bg-slate-200 rounded-full h-2 mb-8 ${darkMode ? 'bg-slate-700' : ''}`}>
          <div 
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className={`p-8 rounded-xl shadow-lg mb-8 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="flex items-start mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                AI Interviewer
              </h3>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {currentQuestion}
              </p>
            </div>
          </div>
        </div>

        {/* Answer Input */}
        <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Your Answer
            </h3>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-3 rounded-full transition-all ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here or use voice recording..."
            rows={6}
            className={`w-full p-4 rounded-lg border mb-4 ${
              darkMode 
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                : 'bg-white border-slate-300'
            }`}
          />

          <div className="flex justify-between items-center">
            <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRecording && (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  Recording...
                </div>
              )}
            </div>
            
            <button
              onClick={submitAnswer}
              disabled={!userAnswer.trim() || isAnalyzing}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Submit Answer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewTrainer;