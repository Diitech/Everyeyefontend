import { useState } from "react";
import {
  Loader2,
  BookOpen,
  CheckCircle,
  Mail,
  AlertCircle,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  topic: string;
  level: "beginner" | "intermediate" | "advanced";
  contentDepth: "concise" | "detailed" | "comprehensive";
  includeVideo: boolean;
}

export function ContentGenerator() {
  const [status, setStatus] = useState<
    "idle" | "generating" | "completed" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    topic: "",
    level: "beginner",
    contentDepth: "detailed",
    includeVideo: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("generating");
    setErrorMessage("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${apiUrl}/api/generate-content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to start generation");
      }

      setStatus("completed");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <main className="pt-[72px] min-h-screen bg-dark">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-coral/10 via-dark to-dark">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            AI <span className="text-coral">Content Studio</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Enter your email and topic. We&apos;ll generate an eBook + video and
            send them to you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-[600px] mx-auto px-4">
          {/* Error State */}
          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-red-400 font-semibold mb-2">
                Generation Failed
              </h3>
              <p className="text-gray-400">{errorMessage}</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 px-4 py-2 bg-dark-100 text-white rounded-lg border border-border hover:bg-dark-200"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Success State */}
          {status === "completed" ? (
            <div className="bg-dark-100 rounded-2xl p-8 border border-border text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Content Sent!
              </h2>
              <p className="text-gray-400 mb-2">Check your email at:</p>
              <p className="text-coral font-semibold text-lg mb-6">
                {formData.email}
              </p>
              <div className="bg-dark rounded-lg p-4 text-left">
                <p className="text-gray-400 text-sm mb-2">
                  What&apos;s happening:
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• AI is writing your eBook (2-3 min)</li>
                  <li>• Generating video with voiceover (3-4 min)</li>
                  <li>• Sending download links to your email (1 min)</li>
                </ul>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                Total time: ~5 minutes. Check spam folder if not received.
              </p>
            </div>
          ) : status === "generating" ? (
            <div className="bg-dark-100 rounded-2xl p-12 border border-border text-center">
              <Loader2 className="w-16 h-16 text-coral animate-spin mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Generating Your Content...
              </h2>
              <p className="text-gray-400 mb-2">Sending to:</p>
              <p className="text-coral font-medium mb-8">{formData.email}</p>
              <div className="space-y-3 max-w-sm mx-auto text-left">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                  <span>Researching and outlining content</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-coral/60 animate-pulse delay-100" />
                  <span>Writing comprehensive eBook</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-coral/40 animate-pulse delay-200" />
                  <span>Generating video and voiceover</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-coral/20 animate-pulse delay-300" />
                  <span>Sending to your email</span>
                </div>
              </div>
            </div>
          ) : (
            /* INPUT FORM */
            <form
              onSubmit={handleSubmit}
              className="bg-dark-100 rounded-2xl p-8 border border-border space-y-6"
            >
              {/* EMAIL - PRIMARY FIELD */}
              <div>
                <label className="text-gray-300 flex items-center gap-2 text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 text-coral" />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  className="w-full mt-1 px-4 py-3 bg-dark border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-coral"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your eBook and video will be sent to this email
                </p>
              </div>

              {/* NAME */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full mt-1 px-4 py-3 bg-dark border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-coral"
                />
              </div>

              {/* TOPIC */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Content Topic
                </label>
                <textarea
                  required
                  value={formData.topic}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  placeholder="e.g., How to Start a Poultry Farming Business..."
                  rows={3}
                  className="w-full mt-1 px-4 py-3 bg-dark border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-coral resize-none"
                />
              </div>

              {/* LEVEL & DEPTH */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Skill Level
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFormData({
                        ...formData,
                        level: e.target.value as FormData["level"],
                      })
                    }
                    className="w-full mt-1 px-4 py-3 bg-dark border border-border rounded-lg text-white focus:outline-none focus:border-coral"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Content Depth
                  </label>
                  <select
                    value={formData.contentDepth}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFormData({
                        ...formData,
                        contentDepth: e.target
                          .value as FormData["contentDepth"],
                      })
                    }
                    className="w-full mt-1 px-4 py-3 bg-dark border border-border rounded-lg text-white focus:outline-none focus:border-coral"
                  >
                    <option value="concise">Concise (20-30 pages)</option>
                    <option value="detailed">Detailed (40-60 pages)</option>
                    <option value="comprehensive">
                      Comprehensive (80+ pages)
                    </option>
                  </select>
                </div>
              </div>

              {/* VIDEO TOGGLE */}
              <div className="flex items-center gap-3 p-4 bg-dark rounded-lg border border-border">
                <input
                  type="checkbox"
                  id="includeVideo"
                  checked={formData.includeVideo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, includeVideo: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-border bg-dark text-coral focus:ring-coral"
                />
                <label
                  htmlFor="includeVideo"
                  className="text-gray-300 cursor-pointer"
                >
                  Include AI-generated video course (+$5)
                </label>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-coral hover:bg-coral-dark text-white h-12 text-lg rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Generate & Send to Email
              </button>

              <p className="text-center text-gray-500 text-sm">
                Content will be delivered to{" "}
                <span className="text-coral">
                  {formData.email || "your email"}
                </span>
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
