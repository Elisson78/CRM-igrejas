export type ActionResponse<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
};

/**
 * A standard wrapper for server actions to centralize error handling,
 * logging, and response formatting.
 */
export async function safeAction<T>(
    actionName: string,
    actionFn: () => Promise<T>
): Promise<ActionResponse<T>> {
    try {
        const result = await actionFn();
        return { success: true, data: result };
    } catch (error: any) {
        console.error(`[Action Error] ${actionName}:`, error);

        // Customize error message based on common patterns if needed
        const message = error.message || "Une erreur inattendue est survenue";
        return { success: false, error: message };
    }
}
