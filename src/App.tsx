import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ChatInterface from "./components/ChatInterface";
import SettingsPanel from "./components/SettingsPanel";
import RoleSelector from "./components/RoleSelector";
import { GenerationConfig, AIRole } from "./types";
import { defaultGenerationConfig, aiRoles } from "./utils/constants";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ApiKeyForm from "./components/ApiKeyForm";

function App() {
	const [apiKey, setApiKey] = useLocalStorage<string>("gemini-api-key", "");
	const [hasApiKey, setHasApiKey] = useState<boolean>(false);
	const [showSettings, setShowSettings] = useState<boolean>(false);
	const [selectedRole, setSelectedRole] = useLocalStorage<AIRole | null>(
		"selected-ai-role",
		null,
	);
	const [generationConfig, setGenerationConfig] =
		useLocalStorage<GenerationConfig>(
			"gemini-generation-config",
			defaultGenerationConfig,
		);

	useEffect(() => {
		setHasApiKey(!!apiKey);
	}, [apiKey]);

	const handleApiKeySubmit = (key: string) => {
		setApiKey(key);
		setHasApiKey(true);
	};

	const handleClearApiKey = () => {
		setApiKey("");
		setHasApiKey(false);
		setSelectedRole(null);
	};

	const toggleSettings = () => {
		setShowSettings(!showSettings);
	};

	if (!hasApiKey) {
		return <ApiKeyForm onSubmit={handleApiKeySubmit} />;
	}

	if (!selectedRole) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header
					onSettingsClick={toggleSettings}
					onClearApiKey={handleClearApiKey}
				/>
				<div className="max-w-6xl mx-auto py-12">
					<div className="text-center mb-12">
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							Choose Your AI Assistant
						</h1>
						<p className="text-gray-600">
							Select a specialized AI role to help you with specific tasks
						</p>
					</div>

					<main className="flex-1 flex">
						<div
							className={`flex-1 transition-all duration-300 ${showSettings ? "pr-80" : ""}`}
						>
							<RoleSelector
								roles={aiRoles}
								selectedRole={selectedRole}
								onSelect={setSelectedRole}
							/>
							<SettingsPanel
								isOpen={showSettings}
								generationConfig={generationConfig}
								setGenerationConfig={setGenerationConfig}
							/>
						</div>
					</main>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<Header
				onSettingsClick={toggleSettings}
				onClearApiKey={handleClearApiKey}
				selectedRole={selectedRole}
				onRoleChange={() => setSelectedRole(null)}
			/>

			<main className="flex-1 flex">
				<div
					className={`flex-1 transition-all duration-300 ${showSettings ? "pr-80" : ""}`}
				>
					<ChatInterface
						apiKey={apiKey}
						generationConfig={generationConfig}
						selectedRole={selectedRole}
					/>
				</div>

				<SettingsPanel
					isOpen={showSettings}
					generationConfig={generationConfig}
					setGenerationConfig={setGenerationConfig}
				/>
			</main>
		</div>
	);
}

export default App;
