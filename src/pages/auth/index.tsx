import LoginForm from './LoginForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from './RegisterForm';

const LoginPage = () => {
  return (
    <div className="w-full my-10 sm:my-16 lg:my-32 xl:my-40 flex justify-center items-center flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <LoginForm />
        </TabsContent>
        <TabsContent value="password">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LoginPage
