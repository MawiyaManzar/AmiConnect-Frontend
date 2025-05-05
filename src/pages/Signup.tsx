
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import SharedLayout from "@/components/SharedLayout";
import { User } from "@/types/user"; // Import the User type

const interestOptions = [
  "Web Development",
  "Cybersecurity & Ethical Hacking",
  "Data Science",
  "Blockchain & Web3",
  "Entrepreneurship and Startup",
  "Cloud Computing & DevOps",
];

const skillOptions = [
  "Python",
  "JavaScript",
  "C / C++",
  "Java / Kotlin",
  "SQL / NoSQL Databases",
];

const learningOptions = [
  "Python",
  "JavaScript",
  "DSA",
  "Machine Learning",
  "Cybersecurity",
];

const departmentOptions = ["BTech", "BCA", "MCA"];

const yearOptions = ["1st", "2nd", "3rd", "4th"];

const connectionOptions = [
  { value: "Study Partner", label: "Study Partner" },
  { value: "Project Collaboration", label: "Project Collaboration" },
  { value: "General", label: "General" },
  { value: "Friendship", label: "Friendship" },
];

// Form schema validation
const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine((email) => email.endsWith("@s.amity.edu"), {
      message: "Email must be an Amity University email (@s.amity.edu)",
    }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  gender: z.enum(["Male", "Female"]),
  interests: z
    .array(z.string())
    .min(3, { message: "Select at least 3 interests" }),
  currentSkills: z.array(z.string()),
  learningSkills: z.array(z.string()),
  department: z.string().min(1, { message: "Department is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  connectionType: z.enum([
    "Study Partner",
    "Project Collaboration",
    "General",
    "Friendship",
  ]),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "Male",
      interests: [],
      currentSkills: [],
      learningSkills: [],
      department: "",
      year: "",
      connectionType: "General",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setIsSubmitting(true);
      // Ensure all required fields are included to meet the User type requirements
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender,
        interests: data.interests,
        skills: data.currentSkills,           // ← note rename
        learning_goals: data.learningSkills,  // ← note rename
        department: data.department,
        year: Number(data.year),
        connection_type: data.connectionType, // ← snake_case
      };
      await register(userData);
      navigate("/recommendations");
    } catch (error) {
      console.error("Registration error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <SharedLayout title="Sign Up for AmiConnect">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Personal Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Personal Information</h2>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amity Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="username@s.amity.edu"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Use your Amity University email
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
                            <Input
                              placeholder="Create a password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Academic Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {departmentOptions.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {yearOptions.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Interests and Skills */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Interests and Skills</h2>

                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <div className="mb-2">
                          <FormLabel className="text-base">
                            Interests (select at least 3)
                          </FormLabel>
                          <FormDescription>
                            Choose your areas of interest
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {interestOptions.map((interest) => (
                            <FormField
                              key={interest}
                              control={form.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={interest}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(interest)}
                                        onCheckedChange={(checked) => {
                                          const updatedList = checked
                                            ? [...field.value, interest]
                                            : field.value?.filter(
                                                (item) => item !== interest
                                              );
                                          field.onChange(updatedList);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {interest}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="currentSkills"
                      render={() => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel className="text-base">Current Skills</FormLabel>
                            <FormDescription>
                              Skills you currently have
                            </FormDescription>
                          </div>
                          {skillOptions.map((skill) => (
                            <FormField
                              key={skill}
                              control={form.control}
                              name="currentSkills"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={skill}
                                    className="flex flex-row items-start space-x-3 space-y-0 mt-1"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(skill)}
                                        onCheckedChange={(checked) => {
                                          const updatedList = checked
                                            ? [...field.value, skill]
                                            : field.value?.filter(
                                                (item) => item !== skill
                                              );
                                          field.onChange(updatedList);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {skill}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="learningSkills"
                      render={() => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel className="text-base">Want to Learn</FormLabel>
                            <FormDescription>
                              Skills you want to develop
                            </FormDescription>
                          </div>
                          {learningOptions.map((skill) => (
                            <FormField
                              key={skill}
                              control={form.control}
                              name="learningSkills"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={skill}
                                    className="flex flex-row items-start space-x-3 space-y-0 mt-1"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(skill)}
                                        onCheckedChange={(checked) => {
                                          const updatedList = checked
                                            ? [...field.value, skill]
                                            : field.value?.filter(
                                                (item) => item !== skill
                                              );
                                          field.onChange(updatedList);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {skill}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Connection Preferences */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Connection Preferences</h2>

                  <FormField
                    control={form.control}
                    name="connectionType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Connection Type</FormLabel>
                        <FormDescription>
                          What type of connections are you looking for?
                        </FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {connectionOptions.map((option) => (
                              <FormItem
                                key={option.value}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={option.value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-4 pt-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating account..." : "Create Account"}
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-medium">
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </SharedLayout>
  );
};

export default Signup;
