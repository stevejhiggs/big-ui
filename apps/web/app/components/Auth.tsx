export function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit,
}: {
  actionText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  status: 'pending' | 'idle' | 'success' | 'error';
  afterSubmit?: React.ReactNode;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="email" className="block text-xs">
          Username
        </label>
        <input type="email" name="email" id="email" className="px-2 py-1 w-full rounded border border-gray-500/20 bg-white dark:bg-gray-800" />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs">
          Password
        </label>
        <input type="password" name="password" id="password" className="px-2 py-1 w-full rounded border border-gray-500/20 bg-white dark:bg-gray-800" />
      </div>
      <button type="submit" className="w-full bg-cyan-600 text-white rounded py-2 font-black uppercase" disabled={status === 'pending'}>
        {status === 'pending' ? '...' : actionText}
      </button>
      {afterSubmit ? afterSubmit : null}
    </form>
  );
}
