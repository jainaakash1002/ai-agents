import React, { useState } from "react";
import { Lightbulb, ChevronUp, ChevronDown } from "lucide-react";
import { PromptTemplate } from "../types";

interface PromptTemplateSelectorProps {
	onSelect: (prompt: string) => void;
	templates: PromptTemplate[];
}

const PromptTemplateSelector: React.FC<PromptTemplateSelectorProps> = ({
	onSelect,
	templates,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	if (templates.length === 0) return null;

	return (
		<div className="mb-4 bg-gray-50 border border-gray-200 rounded-lg">
			<button
				onClick={toggleExpanded}
				className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
			>
				<div className="flex items-center">
					<Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
					<span>Prompt Templates</span>
				</div>
				{isExpanded ? (
					<ChevronUp className="h-4 w-4 text-gray-500" />
				) : (
					<ChevronDown className="h-4 w-4 text-gray-500" />
				)}
			</button>

			{isExpanded && (
				<div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
					{templates.map((template) => (
						<button
							key={template.id}
							onClick={() => {
								onSelect(template.prompt);
								setIsExpanded(false);
							}}
							className="text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
						>
							<h3 className="font-medium text-sm text-gray-800">
								{template.name}
							</h3>
							<p className="text-xs text-gray-500 mt-1">
								{template.description}
							</p>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default PromptTemplateSelector;
