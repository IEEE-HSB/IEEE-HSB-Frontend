import React from 'react'

interface ProjectDescriptionModalProps {
    description: string;
    onClose: () => void;
}
export default function ProjectDescriptionModal({ description, onClose }: ProjectDescriptionModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className={`relative bg-white w-full max-w-2xl bg-neutral-primary-soft rounded-2xl shadow-sm p-4 md:p-6`}>
                <div className="flex items-center justify-between pb-4">
                    <h4 className="text-lg font-semibold mb-2">Project Description</h4>

                    <button
                        onClick={onClose}
                        className="text-body text-xl cursor-pointer w-9 h-9 inline-flex justify-center items-center"
                    >
                        ✕
                    </button>

                </div>
                <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-body text-sm text-foreground">{description}</p>
                </div>

            </div>


        </div>

    )
}
