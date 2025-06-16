'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // 获取待办事项
  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('获取数据失败');
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('获取待办事项失败:', err);
      setError('无法加载待办事项');
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化加载数据
  useEffect(() => {
    fetchTodos();
  }, []);

  // 添加待办事项
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      setError('待办事项不能为空');
      return;
    }

    setError(null);
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: newTodo,
          completed: false 
        }),
      });

      if (!response.ok) {
        throw new Error('添加失败');
      }

      const createdTodo = await response.json();
      setTodos(prev => [...prev, createdTodo]);
      setNewTodo('');
    } catch (err) {
      console.error('添加待办事项失败:', err);
      setError('添加待办事项失败');
    }
  };

  // 切换完成状态
  const toggleTodo = async (id: string) => {
    setError(null);
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
        updatedAt: new Date().toISOString()
      };

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error('更新失败');
      }

      const data = await response.json();
      setTodos(prev => prev.map(todo => todo.id === id ? data : todo));
    } catch (err) {
      console.error('更新待办事项失败:', err);
      setError('更新状态失败');
    }
  };

  // 开始编辑
  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  // 保存编辑
  const saveEdit = async (id: string) => {
    if (!editText.trim()) {
      setError('待办事项不能为空');
      return;
    }

    setError(null);
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = {
        ...todoToUpdate,
        text: editText,
        updatedAt: new Date().toISOString()
      };

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error('更新失败');
      }

      const data = await response.json();
      setTodos(prev => prev.map(todo => todo.id === id ? data : todo));
      setEditingId(null);
    } catch (err) {
      console.error('更新待办事项失败:', err);
      setError('更新内容失败');
    }
  };

  // 删除待办事项
  const deleteTodo = async (id: string) => {
    setError(null);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除失败');
      }

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('删除待办事项失败:', err);
      setError('删除待办事项失败');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* 头部 */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">待办事项</h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            共 {todos.length} 项
          </div>
        </header>

        {/* 错误提示 */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* 添加表单 */}
        <form onSubmit={handleAddTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="添加新的待办事项..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={isLoading || !newTodo.trim()}
            >
              添加
            </button>
          </div>
        </form>

        {/* 待办事项列表 */}
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ul className="space-y-2">
            {todos.length === 0 ? (
              <li className="text-center py-6 text-gray-500 dark:text-gray-400">
                暂无待办事项，请添加
              </li>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`p-4 rounded-md transition-all ${
                    todo.completed
                      ? 'bg-gray-100 dark:bg-gray-800'
                      : 'bg-white dark:bg-gray-800 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          autoFocus
                        />
                      ) : (
                        <span
                          className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}
                        >
                          {todo.text}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {editingId === todo.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(todo.id)}
                            className="px-2 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                          >
                            保存
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700"
                          >
                            取消
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(todo.id, todo.text)}
                            className="px-2 py-1 text-sm text-blue-500 hover:text-blue-700"
                            disabled={todo.completed}
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="px-2 py-1 text-sm text-red-500 hover:text-red-700"
                          >
                            删除
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(todo.createdAt).toLocaleString()}
                    {todo.updatedAt && ` • 更新于: ${new Date(todo.updatedAt).toLocaleString()}`}
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}