interface HelloWorldProps {
  name?: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name = 'World' }) => {
  return (
    <div className="hello-world">
      <h1>Hello, {name}!</h1>
      <p>Welcome to your React + TypeScript + Vite project.</p>
    </div>
  );
};

export default HelloWorld;
