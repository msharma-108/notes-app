"use client"
import React, { useEffect,useState} from 'react'
import { PlusCircle, Edit2, Trash2, Check, X, FileText, CheckSquare, Sparkles, LogOut, User } from 'lucide-react';

import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const simulateAIResponse = (noteContent) => {
  const responses = [
    "This note contains important information about task management and productivity strategies.",
    "Key insights: Focus on prioritization and time management techniques for better efficiency.",
    "Summary: This appears to be planning content with actionable items and organizational thoughts.",
    "The content discusses workflow optimization and personal productivity methodologies.",
    "Main themes: Goal setting, task organization, and systematic approach to work management."
  ];
  
  // Simple logic to vary responses based on content length
  if (noteContent.length < 50) {
    return "This is a brief note. Consider expanding with more details for better organization.";
  } else if (noteContent.length > 200) {
    return "This is a comprehensive note covering multiple aspects. Consider breaking it into smaller, focused sections.";
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
};


const dashboard = () => {
  const router=useRouter()

    const getData=async(id)=>{
      const {data}=await axios.get(`/api/getData/${id}`)
      console.log(data)
      setUser(data)
    }


    useEffect(()=>{
        const checkLoggedIn=async()=>{
            axios.defaults.withCredentials=true
            const {data}=await axios.get(`/api/checkAuth`)
            console.log(data)
            if(!data.loggedIn){ 
                toast.error("Not logged in")
                router.push("/")
            }
            else {
              await getData(data.id.id)
            }
              
        }
        checkLoggedIn()
    },[])
    
    const [activeTab, setActiveTab] = useState('notes');
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [noteForm, setNoteForm] = useState({ title: '', description: '' });
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loadingAI, setLoadingAI] = useState(null);
    const [user,setUser] = useState(null);
    const [AiSummary, setAiSummary] = useState(null)
    const [responseLoaded, setResponseLoaded] = useState(true)
    const [summaryObj,setSummaryObj]= useState(null)
    // Note functions
    const openNoteModal = (note = null) => {
      if(note) setEditingNote(note._id);
      setNoteForm(note ? { title: note.title, description: note.description } : { title: '', description: '' });
      setShowNoteModal(true);
    };
  
    const closeNoteModal = () => {
      setShowNoteModal(false);
      setEditingNote(null);
      setNoteForm({ title: '', description: '' });
    };
  
    const saveNote = async () => {
      if (!noteForm.title.trim() || !noteForm.description.trim()) return;
  
      if (editingNote) {
        await axios.post(`/api/addNote`,{noteId:editingNote,_id:user._id,title:noteForm.title,description:noteForm.description})
      }
      else{
        await axios.post(`/api/addNote`,{_id:user._id,title:noteForm.title,description:noteForm.description})
      }
      await getData(user._id)
      closeNoteModal();
    };
  
    const deleteField =async (field,fieldId) => {
      await axios.post(`/api/deleteField`,{field,fieldId,userId:user._id});
      await getData(user._id)
    };
  
    const generateAISummary = async (noteId) => {
     
      const note = user.notes.find(n => n._id === noteId);
      // Simulate API delay
      setResponseLoaded(false)
      setSummaryObj({id:noteId})
      await new Promise(resolve => setTimeout(resolve, 2000));
      const aiResponse = simulateAIResponse(note.description);
      setSummaryObj({id:noteId,aiResponse})
      setResponseLoaded(true)
    };
  
    // Task functions
    const addTask =async () => {
      if (!newTaskTitle.trim()) return;
      
  
      await axios.post(`/api/addTask`,{userId:user._id,newTaskTitle})
      await getData(user._id)
      setNewTaskTitle('');
    };
  
    const toggleTask = async(id,isCompleted) => {
      await axios.post(`/api/toggleTaskStatus`,{userId:user._id,taskId:id,isCompleted})
      await getData(user._id)
    };
  
  
  
    const handleLogout =async () => {
        await axios.post(`/api/logout`)
        toast.success("Logging you out")
        router.push("/")
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">My Workspace</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span className='hidden md:block'>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
  
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="mb-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Notes</span>
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tasks'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <CheckSquare className="h-4 w-4" />
                <span>Tasks</span>
              </button>
            </nav>
          </div>
  
          {/* Notes Tab */}
          
          {activeTab === 'notes' &&(
           
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Notes</h2>
                <button
                  onClick={() => openNoteModal()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Note</span>
                </button>
              </div>
  
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {user?.notes && (user.notes.map((note) => (
                  <div key={note._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{note.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openNoteModal(note)}
                          className="text-gray-400 hover:text-blue-600"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteField("notes",note._id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{note.createdAt}</span>
                      <button
                        onClick={() => generateAISummary(note._id)}
                        disabled={summaryObj?.id === note._id && summaryObj?.aiResponse}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs flex items-center space-x-1 disabled:opacity-50"
                      >
                        <Sparkles className="h-3 w-3" />
                        <span>{(!responseLoaded && summaryObj?.id===note._id) ? 'Generating...' : 'AI Summary'}</span>
                      </button>
                    </div>
                    
                    {summaryObj?.id===note._id && summaryObj?.aiResponse && (
                      <div onClick={()=>{setSummaryObj(null)}} className="mt-4 p-3 cursor-pointer bg-purple-50 rounded-md">
                        <p className="text-sm text-purple-800">{summaryObj.aiResponse}</p>
                      </div>
                    )}
                  </div>
                )))}
              </div>
            </div>)
          }
  
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
              </div>
  
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="md:flex space-y-1 space-x-3">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  />
                  <button
                    onClick={addTask}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
  
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {user?.tasks.length==0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <CheckSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No tasks yet. Add one above to get started!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {user?.tasks.map((task) => (
                      <div key={task._id} className="flex items-center  w-full justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-3 w-9/10 text-sm">
                        <div>
                          <button
                            onClick={() => toggleTask(task._id,task.completed)}
                            className={`flex items-center justify-center w-5 h-5 rounded border-2 ${
                              task.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-green-500'
                            }`}
                          >
                            {task.completed && <Check className="h-3 w-3" />}
                          </button>
                          </div>
                          <div className='w-full'>
                            <p className={`text-wrap w-4/5 break-words font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.title}
                            </p>
                            <p className="text-xs text-gray-500">{task.createdAt}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteField("tasks",task._id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
  
        {/* Note Modal */}
        {showNoteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingNote ? 'Edit Note' : 'Add New Note'}
                </h3>
                <button
                  onClick={closeNoteModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={noteForm.title}
                    onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note title..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={noteForm.description}
                    onChange={(e) => setNoteForm({ ...noteForm, description: e.target.value })}
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your note content here..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={closeNoteModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingNote ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default dashboard