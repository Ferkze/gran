package main

import "testing"

func TestHello(t *testing.T) {
    want := "Hello, 世界"
    if got := Hello(); got != want {
        t.Errorf("Hello() = %q, want %q", got, want)
    }
}
