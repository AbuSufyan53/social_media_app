import { z } from "zod"
import { SignUpValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { useCreateUserAccountMutation, useSignInAccountMutation } from "@/lib/react-query/queriesAndMutations"

const SignupForm = () => {
    const {toast} = useToast()
    
    const { mutateAsync:createUserAccount, isPending:isCreatingUser } = useCreateUserAccountMutation() //https://www.youtube.com/watch?v=_W3R2VwRyF4&t=8860s 1:35
    const { mutateAsync:signInAccount, isPending:isSigningIn} = useSignInAccountMutation()

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignUpValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const newUser = await createUserAccount(values)
        if (!newUser) {
            return toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.Signed Up Failed. Please Try again",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        })}

        const session = await signInAccount({
            email:values.email,
            password:values.password,
        })

        if(!session){
            return toast({
                title:"Uh oh! Something went wrong. Login Failed. Please Try again"
            })
        }
    }
    function clickHandle(){
        return toast({title:"something went wrong", 
                    variant: "destructive",
                    description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
    }
    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="logo" />
                <h2 className=" h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account.</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram, please enter your account details.</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Name" className=" shad-input" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Username" className=" shad-input" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" className=" shad-input" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" className=" shad-input" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary">
                        {isCreatingUser
                            ?
                            <div className="flex-center gap-2">
                                <Loader />Loading...
                            </div>
                            :
                            "Sign Up"
                        }
                    </Button>
                    <button onClick={()=>clickHandle()}>click</button>
                    <p className="text-small-regular text-light-2 text-center mt-2">Already have account? <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">login</Link></p>
                </form>
            </div>
        </Form>
    )
}

export default SignupForm
