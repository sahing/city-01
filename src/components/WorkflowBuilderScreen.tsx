import React, { useState } from 'react';
import { FormFieldConfig, WorkflowRule } from '../mockData';

interface WorkflowBuilderProps {
  fields: FormFieldConfig[];
  rules: WorkflowRule[];
  onUpdateFields: (fields: FormFieldConfig[]) => void;
  onUpdateRules: (rules: WorkflowRule[]) => void;
  onPreviewFlow: () => void;
}

export const WorkflowBuilderScreen: React.FC<WorkflowBuilderProps> = ({
  fields,
  rules,
  onUpdateFields,
  onUpdateRules,
  onPreviewFlow,
}) => {
  const [activeStage, setActiveStage] = useState(3);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<FormFieldConfig['type']>('text');
  const [isPublished, setIsPublished] = useState(false);
  const [activeTab, setActiveTab] = useState<'orchestrator' | 'fields' | 'tariff'>('orchestrator');

  const handleAddField = () => {
    if (!newFieldLabel.trim()) return;
    const newField: FormFieldConfig = {
      id: `field-${Date.now()}`,
      label: newFieldLabel.trim(),
      type: newFieldType,
      subLabel: `${newFieldType} input • Configurable`,
      required: false,
      badge: newFieldType.toUpperCase(),
      defaultValue: newFieldType === 'counter' ? 1 : false,
    };
    onUpdateFields([...fields, newField]);
    setNewFieldLabel('');
    setShowAddModal(false);
  };

  const handleToggleRequired = (id: string) => {
    onUpdateFields(
      fields.map((f) => (f.id === id && !f.locked ? { ...f, required: !f.required } : f))
    );
  };

  const handlePublish = () => {
    setIsPublished(true);
    setTimeout(() => setIsPublished(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-36 animate-fade-in max-w-lg mx-auto px-4">
      {/* Pipeline & Version Selector */}
      <section className="pt-3 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold text-emerald-700 tracking-wide uppercase">
                Live v2.4
              </span>
              <span className="text-[10px] text-slate-400">• Editing Draft v2.5</span>
            </div>
            <div className="flex items-center gap-1">
              <h1 className="text-base font-bold text-slate-900">Outstation Private Cab</h1>
              <span className="material-symbols-outlined text-[16px] text-slate-400">
                unfold_more
              </span>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold shadow-xs"
          >
            <span className="material-symbols-outlined text-[14px] text-blue-600">history</span>
            <span>Draft History</span>
          </button>
        </div>
      </section>

      {/* Mode Selector Tabs */}
      <div className="flex items-center p-1 rounded-xl bg-slate-200/70 gap-1 my-2">
        <button
          type="button"
          onClick={() => setActiveTab('orchestrator')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1 transition-all ${
            activeTab === 'orchestrator'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">account_tree</span>
          <span>Orchestrator</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('fields')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1 transition-all ${
            activeTab === 'fields'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">dynamic_form</span>
          <span>Form Fields</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tariff')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1 transition-all ${
            activeTab === 'tariff'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">price_change</span>
          <span>Tariff Matrix</span>
        </button>
      </div>

      {/* Step Progress Indicator */}
      <section className="py-2">
        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-2 px-1">
            <span className="font-bold text-slate-900">Stage 3 of 4: Passenger Details</span>
            <span className="text-slate-400 text-[11px]">75% configured</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="flex flex-col gap-1">
              <div className="h-1.5 rounded-full bg-emerald-500"></div>
              <div className="flex items-center gap-0.5 text-[10px] text-slate-500 font-medium">
                <span className="material-symbols-outlined text-[11px] text-emerald-600">
                  check
                </span>
                <span className="truncate">1. Route</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-1.5 rounded-full bg-emerald-500"></div>
              <div className="flex items-center gap-0.5 text-[10px] text-slate-500 font-medium">
                <span className="material-symbols-outlined text-[11px] text-emerald-600">
                  check
                </span>
                <span className="truncate">2. Fleet</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-1.5 rounded-full bg-blue-600"></div>
              <div className="flex items-center gap-0.5 text-[10px] text-blue-600 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span className="truncate">3. Pass.</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-1.5 rounded-full bg-slate-200"></div>
              <div className="flex items-center gap-0.5 text-[10px] text-slate-400 font-medium">
                <span className="material-symbols-outlined text-[11px]">lock</span>
                <span className="truncate">4. Pay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stage Fields List */}
      <section className="mt-2 flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Stage Fields</h2>
            <p className="text-xs text-slate-400">Fields rendered on traveler checkout</p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
            {fields.length} Fields
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {fields.map((field) => (
            <div
              key={field.id}
              className={`p-3 rounded-2xl bg-white border shadow-xs flex items-center justify-between transition-all ${
                field.locked ? 'border-slate-200 bg-slate-50/50' : 'border-slate-200/90'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="material-symbols-outlined text-[18px] text-slate-400 cursor-grab">
                  {field.locked ? 'lock' : 'drag_indicator'}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {field.label}
                    </span>
                    {field.badge && (
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                          field.badgeType === 'mandatory'
                            ? 'bg-red-100 text-red-700'
                            : field.badgeType === 'conditional'
                            ? 'bg-purple-100 text-purple-700'
                            : field.badgeType === 'fee'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {field.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                    {field.subLabel}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {field.locked ? (
                  <span className="text-[10px] text-slate-400 font-semibold">Locked</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleToggleRequired(field.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                      field.required
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {field.required ? 'Required' : 'Optional'}
                  </button>
                )}
                {!field.locked && (
                  <button
                    type="button"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"
                  >
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Component Actions */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2 mt-1">
          <span className="text-xs font-bold text-slate-700">Add Form Component</span>
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => {
                setNewFieldType('text');
                setShowAddModal(true);
              }}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 gap-1 text-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-blue-600">
                text_fields
              </span>
              <span className="text-[10px] font-semibold">Text</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setNewFieldType('switch');
                setShowAddModal(true);
              }}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 gap-1 text-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-blue-600">
                toggle_on
              </span>
              <span className="text-[10px] font-semibold">Switch</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setNewFieldType('counter');
                setShowAddModal(true);
              }}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 gap-1 text-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-blue-600">
                pin
              </span>
              <span className="text-[10px] font-semibold">Counter</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setNewFieldType('select');
                setShowAddModal(true);
              }}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 gap-1 text-center transition-colors font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span className="text-[10px]">Custom</span>
            </button>
          </div>
        </div>
      </section>

      {/* Conditional Rules Section */}
      <section className="mt-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-slate-900">Conditional Rules & Triggers</h2>
          <button
            type="button"
            onClick={() => {
              const newRule: WorkflowRule = {
                id: `rule-${Date.now()}`,
                title: 'Custom Fare Trigger',
                status: 'active',
                conditionText: 'IF Luggage > 4',
                actionText: 'THEN Require Carrier Vehicle (SUV Only)',
              };
              onUpdateRules([...rules, newRule]);
            }}
            className="text-xs font-semibold text-blue-600 flex items-center gap-0.5 hover:underline"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            <span>Add Rule</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>{rule.title}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                  Active
                </span>
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-blue-600 font-mono text-[11px]">IF</span>
                <span>{rule.conditionText}</span>
                <span className="text-slate-400">→</span>
                <span className="font-bold text-orange-600 font-mono text-[11px]">THEN</span>
                <span className="font-medium text-slate-800">{rule.actionText}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-sm">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          <button
            type="button"
            onClick={onPreviewFlow}
            className="flex-1 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-blue-600">visibility</span>
            <span>Preview Flow</span>
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className={`flex-1 h-11 rounded-xl text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all ${
              isPublished ? 'bg-emerald-600' : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPublished ? 'check_circle' : 'publish'}
            </span>
            <span>{isPublished ? 'Published Live!' : 'Publish v2.5'}</span>
          </button>
        </div>
      </div>

      {/* Add Field Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-900">Add New Form Field</h3>
            <div>
              <label className="text-xs text-slate-500 font-medium block mb-1">Field Label</label>
              <input
                type="text"
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                placeholder="e.g. Return Flight Number, Child Seat"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-medium block mb-1">Field Type</label>
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
              >
                <option value="text">Text Input</option>
                <option value="switch">Switch / Boolean</option>
                <option value="counter">Numeric Counter</option>
                <option value="select">Dropdown Selection</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddField}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white"
              >
                Add Field
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
