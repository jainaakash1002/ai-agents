import type React from "react";
import type { AIRole } from "../types";
import * as Icons from "lucide-react";

interface RoleSelectorProps {
	roles: AIRole[];
	selectedRole: AIRole | null;
	onSelect: (role: AIRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
	roles,
	selectedRole,
	onSelect,
}) => {
	const getIcon = (iconName: string) => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const Icon = (Icons as any)[iconName];
		return Icon ? <Icon className="h-6 w-6" /> : null;
	};

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
			{roles.map((role) => (
				// biome-ignore lint/a11y/useButtonType: <explanation>
				<button
					key={role.id}
					onClick={() => onSelect(role)}
					className={`flex flex-col items-center p-6 rounded-xl border transition-all duration-200 ${
						selectedRole?.id === role.id
							? "border-blue-500 bg-blue-50 shadow-md"
							: "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
					}`}
				>
					<div
						className={`p-3 rounded-full ${
							selectedRole?.id === role.id
								? "bg-blue-100 text-blue-600"
								: "bg-gray-100 text-gray-600"
						}`}
					>
						{getIcon(role.icon)}
					</div>
					<h3 className="mt-4 font-medium text-gray-900">{role.name}</h3>
					<p className="mt-1 text-sm text-gray-500 text-center">
						{role.description}
					</p>
				</button>
			))}
		</div>
	);
};

export default RoleSelector;
