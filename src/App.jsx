import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Code2,
  CheckCircle2,
  Laptop,
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import ProgressSection from './components/ProgressSection';
import SearchFilters from './components/SearchFilters';
import QuestionList from './components/QuestionList';
import QuestionFormModal from './components/QuestionFormModal';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';

import {
  loadStoredQuestions,
  saveStoredQuestions,
  loadMachineCodingStatus,
  saveMachineCodingStatus,
} from './utils/storage';
import {
  calculateMetrics,
  filterQuestions,
  generateId,
} from './utils/questionUtils';
import { SAMPLE_QUESTIONS } from './data/sampleData';

/**
 * Main application component for Interview Practice Tracker.
 */
function App() {
  // 1. Core State with LocalStorage Initialization
  const [questions, setQuestions] = useState(() => loadStoredQuestions());
  const [machineCodingStatus, setMachineCodingStatus] = useState(() => loadMachineCodingStatus());

  // 2. Search & Filter State
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    difficulty: 'All',
    status: 'All',
  });

  // 3. UI State for Modals and Drawers
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  // 4. Persistence Synchronization
  useEffect(() => {
    saveStoredQuestions(questions);
  }, [questions]);

  useEffect(() => {
    saveMachineCodingStatus(machineCodingStatus);
  }, [machineCodingStatus]);

  // 5. Derived Values (Metrics & Filtered Questions)
  const metrics = useMemo(() => calculateMetrics(questions), [questions]);

  const filteredQuestions = useMemo(
    () => filterQuestions(questions, filters),
    [questions, filters]
  );

  // 6. Action Handlers
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      difficulty: 'All',
      status: 'All',
    });
  };

  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (question) => {
    setEditingQuestion(question);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = (formData) => {
    if (editingQuestion && editingQuestion.id) {
      // Edit existing
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestion.id
            ? { ...q, ...formData, updatedAt: new Date().toISOString() }
            : q
        )
      );
      showToast('Question updated successfully!');
    } else {
      // Add new
      const newQuestion = {
        ...formData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setQuestions((prev) => [newQuestion, ...prev]);
      showToast('New question added to your tracker!');
    }
    handleCloseFormModal();
  };

  const handlePromptDelete = (question) => {
    setQuestionToDelete(question);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!questionToDelete) return;
    setQuestions((prev) => prev.filter((q) => q.id !== questionToDelete.id));
    showToast(`Deleted "${questionToDelete.title}"`, 'error');
    setIsConfirmDeleteOpen(false);
    setQuestionToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setQuestionToDelete(null);
  };

  const handleStatusChange = (questionId, newStatus) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, status: newStatus, updatedAt: new Date().toISOString() }
          : q
      )
    );
    showToast(`Status updated to ${newStatus}`);
  };

  const handleMachineCodingChange = (newStatus) => {
    setMachineCodingStatus(newStatus);
    showToast(`Machine-Coding status set to ${newStatus}`);
  };

  const handleLoadSamples = () => {
    setQuestions(SAMPLE_QUESTIONS);
    showToast('Loaded 8 practice questions into tracker!');
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeCategory={filters.category}
        onSelectCategory={(cat) => handleFilterChange('category', cat)}
        metrics={metrics}
        machineCodingStatus={machineCodingStatus}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          onOpenAddModal={handleOpenAddModal}
          onLoadSamples={handleLoadSamples}
          hasQuestions={questions.length > 0}
        />

        <main className="page-content" id="main-content">
          {/* 1. Dashboard Summary Cards */}
          <section className="stats-grid" aria-label="Dashboard Metrics">
            {/* Total Questions Card */}
            <StatCard
              icon={BookOpen}
              iconColorClass="blue"
              label="Total Questions"
              value={metrics.total}
              subtext={`${metrics.totalCompleted} completed overall`}
            />

            {/* Completed DSA Problems Card */}
            <StatCard
              icon={Code2}
              iconColorClass="purple"
              label="Completed DSA Problems"
              value={metrics.completedDsa}
              subtext={`${metrics.dsaPercentage}% of ${metrics.dsaTotal} DSA problems`}
            />

            {/* Completed Interview Questions Card (Technical + Git combined) */}
            <StatCard
              icon={CheckCircle2}
              iconColorClass="emerald"
              label="Completed Interview Questions"
              value={metrics.completedInterview}
              subtext={`Technical (${metrics.completedTech}) + Git (${metrics.completedGit}) combined`}
            />

            {/* Machine-Coding Status Card (Manually Managed) */}
            <StatCard
              icon={Laptop}
              iconColorClass="amber"
              label="Machine-Coding Status"
              isMachineCoding={true}
              machineCodingStatus={machineCodingStatus}
              onMachineCodingChange={handleMachineCodingChange}
              subtext="Manually tracked milestone"
            />
          </section>

          {/* 2. Visual Progress Section */}
          <ProgressSection metrics={metrics} />

          {/* 3. Search and Combined Filters */}
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalCount={metrics.total}
            filteredCount={filteredQuestions.length}
          />

          {/* 4. Question Log & Cards */}
          <QuestionList
            questions={filteredQuestions}
            totalQuestionsCount={metrics.total}
            onEdit={handleOpenEditModal}
            onDelete={handlePromptDelete}
            onStatusChange={handleStatusChange}
            onAddQuestion={handleOpenAddModal}
            onResetFilters={handleResetFilters}
            onLoadSamples={handleLoadSamples}
          />
        </main>
      </div>

      {/* Modal: Add/Edit Question */}
      <QuestionFormModal
        isOpen={isFormModalOpen}
        initialData={editingQuestion}
        onClose={handleCloseFormModal}
        onSubmit={handleSaveQuestion}
      />

      {/* Modal: Confirm Deletion */}
      <ConfirmDialog
        isOpen={isConfirmDeleteOpen}
        title="Delete Question"
        message="Are you sure you want to delete this question? It will be removed from your tracker and LocalStorage."
        itemTitle={questionToDelete?.title}
        confirmLabel="Delete Question"
        cancelLabel="Keep Question"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Notification Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
