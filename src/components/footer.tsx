"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-700 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-300 text-sm">
            <p className="mb-2">
              PRs are welcome! I appreciate your contributions.
            </p>
            <p>
              Have feedback or feature requests? Contact me at{" "}
              <Link
                href="mailto:ecvebbesen@gmail.com"
                className="text-blue-400 hover:underline"
              >
                ecvebbesen@gmail.com
              </Link>
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 text-gray-300 hover:bg-gray-600"
            asChild
          >
            <Link
              href="https://github.com/Carlvebbesen/Bislett-Kalkulator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
